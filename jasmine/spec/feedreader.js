/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         *
         * testing loops, see http://tosbourn.com/using-loops-in-jasmine/
         */
        function testUrl(elem) {
            it('should have a url', function() {
                expect(elem.url).toBeDefined();
                expect(elem.url.length).not.toBe(0);
            });
        }
        for (var i = 0; i < allFeeds.length; i++) {
            testUrl(allFeeds[i]);
        };

        /* Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        function testName(elem) {
            it('should have a name', function() {
                expect(elem.name).toBeDefined();
                expect(elem.name.length).not.toBe(0);
            });
        }
        for (var i = 0; i < allFeeds.length; i++) {
            testName(allFeeds[i]);
        };
    });


    /*  Write a new test suite named "The menu" */
    describe('The menu', function() {
        /* Write a test that ensures the menu element is
         * hidden by default.
         *
         * test if body has class "menu-hidden"
         */
        it('should be hidden', function() {
            expect($('body')).toHaveClass("menu-hidden");
        });

         /* Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * has two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
        it('should toggle', function() {
            //display when clicked
            $('.menu-icon-link').click();
            expect($('body')).not.toHaveClass("menu-hidden");

            //hidden when clicked again
            $('.menu-icon-link').click();
            expect($('body')).toHaveClass("menu-hidden");
        });
    });


    /*  Write a new test suite named "Initial Entries" */

        /* Write a test that ensures when the loadFeed
        * function is called and completes its work, there is at least
        * a single .entry element within the .feed container.
        * loadFeed() is asynchronous so this test will
        * use beforeEach() and the done() function.
        */
    describe('Initial Entries', function() {
        beforeEach(function(done) {
            loadFeed(0, function(){
                done();
            });
        });
        it('should load initial feed', function(done) {
            //when loaded check if there is at least one entry
            expect($('.feed .entry').length).toBeGreaterThan(0);
            done();
        });
    });





    /*  Write a new test suite named "New Feed Selection"

        /* Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         *
         * initialFeed holds the html of the first feed loaded
         * newFeed holds the html of the feed that is currently loaded
         */
    describe('New Feed Selection', function() {
        var initialFeed,
            newFeed;
        beforeEach(function(done) {
            loadFeed(0, function() {
                initialFeed = $('.feed').html();
                loadFeed(1, function() {
                    done();
                });
            });
        });
        it('should modify content', function(done) {
            newFeed = $('.feed').html();
            //test if the two feeds are different
            expect(newFeed).not.toEqual(initialFeed);
            done();
        });
    });
}());
