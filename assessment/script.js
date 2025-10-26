(function(){
  const form = document.getElementById('quiz');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Collect answers (12 selects)
    const selects = [...form.querySelectorAll('select')];
    const values = selects.map(s => Number(s.value || 0));
    const total = values.reduce((a,b)=>a+b,0);
    const max = values.length * 5; // each item max 5
    const score = Math.round((total / max) * 100); // 0..100

    // Simple readiness band
    const band = score >= 85 ? 'Ready'
              : score >= 70 ? 'Moderate Risk'
              : score >= 50 ? 'Elevated Risk'
              : 'High Risk';

    // Proxy SPRS (scaled 0..110 for quick executive context; NOT official)
    const sprsProxy = Math.round((score / 100) * 110);

    // Organization metadata
    const org = (document.getElementById('org').value || 'CMMC Client').trim();
    const email = (document.getElementById('email').value || '').trim();
    const level = document.getElementById('level').value || '2';

    // OPTIONAL: Post to Make.com (replace with your webhook URL)
    const MAKE_WEBHOOK = "https://hook.eu1.make.com/your-webhook-id"; // <-- replace
    if (MAKE_WEBHOOK && MAKE_WEBHOOK.includes('make.com')) {
      try {
        await fetch(MAKE_WEBHOOK, {
          method: "POST",
          headers: {"Content-Type":"application/json"},
          body: JSON.stringify({
            type: "cmmc_assessment",
            level,
            score,
            sprs_proxy: sprsProxy,
            band,
            answers: values,
            org,
            email,
            date: new Date().toISOString(),
            page: location.href
          })
        });
      } catch(err){
        console.warn('Webhook failed (continuing to report):', err);
      }
    }

    // Redirect to report with params
    const q = new URLSearchParams({
      org, level, score: String(score), sprs: String(sprsProxy)
    }).toString();

    window.location.href = `/reports/cmmc_gap_report_xyberiq.html?${q}`;
  });
})();
