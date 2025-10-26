cmmc/
│
├── index.html                      ← landing page (modern dark/light design)
│
├── /assessment/                    ← client-side readiness quiz
│   ├── index.html                  ← 12-question CMMC 2.0 form
│   ├── style.css                   ← styling for assessment
│   └── script.js                   ← scoring logic + webhook + redirect
│
├── /reports/                       ← output pages
│   └── cmmc_gap_report_xyberiq.html← dark-mode report with dynamic score
│
├── /assets/                        ← shared static assets
│   ├── cmmc-og-1200x630.png        ← Open Graph / LinkedIn preview image
│   ├── logo.svg                    ← XyberIQ mark
│   ├── report-theme.css            ← shared report stylesheet (optional)
│   └── theme-toggle.js             ← light/dark switch logic
│
├── CNAME                           ← `cmmc.xyberiq.io`
└── .nojekyll                       ← disables Jekyll processing
