'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('my app', function() {


  it('should automatically redirect to /heatAlert when location hash/fragment is empty', function() {
    browser.get('index.html');
    expect(browser.getLocationAbsUrl()).toMatch("/heatAlert");
  });


  describe('heatAlert', function() {

    beforeEach(function() {
      browser.get('index.html#/heatAlert');
    });


    it('should render heatAlert when user navigates to /heatAlert', function() {
      expect(element.all(by.css('[ng-view] p')).first().getText()).
        toMatch(/partial for heat alert view/);
    });

  });


  describe('extremeHeatAlert', function() {

    beforeEach(function() {
      browser.get('index.html#/extremeHeatAlert');
    });


    it('should render extremeHeatAlert when user navigates to /extremeHeatAlert', function() {
      expect(element.all(by.css('[ng-view] p')).first().getText()).
        toMatch(/partial for extreme heat alert view/);
    });

  });
});
