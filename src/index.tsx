import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './global.css'
// import reportWebVitals from './reportWebVitals'
import CookieConsent from './vendors/cookie-consent-js'

let cookieConsent

if (CookieConsent) {
	const startTracking = (shouldTrack: boolean) => {
		if (!shouldTrack) return
		
		// @ts-ignore
		// eslint-disable-next-line @typescript-eslint/no-unused-expressions
		!function(){var analytics=window.analytics=window.analytics||[];if(!analytics.initialize)if(analytics.invoked)window.console&&console.error&&console.error("Segment snippet included twice.");else{analytics.invoked=!0;analytics.methods=["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","reset","group","track","ready","alias","debug","page","once","off","on","addSourceMiddleware","addIntegrationMiddleware","setAnonymousId","addDestinationMiddleware"];analytics.factory=function(e){return function(){var t=Array.prototype.slice.call(arguments);t.unshift(e);analytics.push(t);return analytics}};for(var e=0;e<analytics.methods.length;e++){var key=analytics.methods[e];analytics[key]=analytics.factory(key)}analytics.load=function(key,e){var t=document.createElement("script");t.type="text/javascript";t.async=!0;t.src="https://cdn.segment.com/analytics.js/v1/" + key + "/analytics.min.js";var n=document.getElementsByTagName("script")[0];n.parentNode.insertBefore(t,n);analytics._loadOptions=e};analytics._writeKey="HVKjDaydHfJYak4h3PDdtd4rIFYv12IS";analytics.SNIPPET_VERSION="4.13.2";
			analytics.load("HVKjDaydHfJYak4h3PDdtd4rIFYv12IS");
			analytics.page();
		}}();

		// @ts-ignore
		// eslint-disable-next-line @typescript-eslint/no-unused-expressions, no-sequences
		window.heap=window.heap||[],heap.load=function(e,t){window.heap.appid=e,window.heap.config=t=t||{};var r=document.createElement("script");r.type="text/javascript",r.async=!0,r.src="https://cdn.heapanalytics.com/js/heap-"+e+".js";var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(r,a);for(var n=function(e){return function(){heap.push([e].concat(Array.prototype.slice.call(arguments,0)))}},p=["addEventProperties","addUserProperties","clearEventProperties","identify","resetIdentity","removeEventProperty","setEventProperties","track","unsetEventProperty"],o=0;o<p.length;o++)heap[p[o]]=n(p[o])};   
		// @ts-ignore
		heap.load("4022209762"); 
	}

	cookieConsent = new CookieConsent({
		privacyPolicyUrl: 'https://uploadcare.com/about/privacy_policy/',
		postSelectionCallback: startTracking
	})

	if (cookieConsent.trackingAllowed()) {
		startTracking(true)
	}
}

ReactDOM.render(
	<App cookieConsent={cookieConsent} />,
	document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals()
