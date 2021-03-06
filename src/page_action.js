var refreshData = function(event) {
    chrome.tabs.query({ active:true, currentWindow:true }, function(tabs) {
        var thisTab = tabs[0];
        chrome.tabs.sendMessage(thisTab.id, { request: "refresh_data" }, function (response) {
            if (response == 'ok') {
                ga('send', 'event', 'manual_data_refresh', 'success', thisTab.url);
            }
            else {
                ga('send', 'event', 'manual_data_refresh', 'fail', thisTab.url);
            }
        });
    });
};

document.addEventListener('DOMContentLoaded', function() {
    jQuery("#refresh-data").click(function(event) {
		refreshData();
	});
    jQuery("#settings-btn").click(function(event) {
		window.open(chrome.extension.getURL("settings.html"), "_blank");
	});
    jQuery("#report-bug").click(function(event) {
		window.open('https://chrome.google.com/webstore/detail/fantasyplus/gojndgicjncbiobejfpjpcahadininga/support', "_blank");
	});
})
