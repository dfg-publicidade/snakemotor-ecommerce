//Google Analytics
window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date;
ga('create', 'UA-199264531-1', 'auto');

let urlGoogleAnalytics = 'https://www.google-analytics.com/analytics.js';

let scriptGoogleAnalytics = document.createElement('script');
scriptGoogleAnalytics.src = urlGoogleAnalytics;
scriptGoogleAnalytics.type = 'text/javascript';

if (document.querySelectorAll('[src="' + urlGoogleAnalytics + '"]').length === 0) {
    document.getElementsByTagName('head')[0].appendChild(scriptGoogleAnalytics);
}