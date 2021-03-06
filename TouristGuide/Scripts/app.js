﻿var ViewModel = function () {
    var self = this;
    self.tourists = ko.observableArray();
    self.error = ko.observable();
    self.detail = ko.observable();

    self.getTouristDetail = function (item) {
        ajaxHelper(touristsUri + item.Id, 'GET').done(function (data) {
            self.detail(data);
        });
    }

    

    var touristsUri = '/api/tourists/';

    function ajaxHelper(uri, method, data) {
        self.error(''); // Clear error message
        return $.ajax({
            type: method,
            url: uri,
            dataType: 'json',
            contentType: 'application/json',
            data: data ? JSON.stringify(data) : null
        }).fail(function (jqXHR, textStatus, errorThrown) {
            self.error(errorThrown);
        });
    }

    function getAllTourists() {
        ajaxHelper(touristsUri, 'GET').done(function (data) {
            self.tourists(data);
        });
    }

    // Fetch the initial data.
    getAllTourists();
};



ko.applyBindings(new ViewModel());