/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against the application.
 */

/* All the tests are placed within the $() function,
 * since some of these tests may require DOM elements and it
 * should be ensured they don't run until the DOM is ready.
 */

$(function () {

    //Test suite for the RSS Feeds
    describe('RSS Feeds', function () {

        //testing that the allFeeds variable has been defined and
        //that it is not empty

        it('are defined', function () {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        //looping through the feeds in allFeeds and ensuring
        //that they all have a URL defined and that it is not empty

        it('have a URL', function () {

            function testEachURL(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url).not.toBeFalsy();
            }

            for (var i = 0; i < allFeeds.length; i++) {
                testEachURL(allFeeds[i]);
            }
        });

        //looping through the feeds in allFeeds and ensuring
        //that they all have a name defined and that it is not empty

        it('have a name', function () {

            function testEachName(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name).not.toBeFalsy();
            }

            for (var i = 0; i < allFeeds.length; i++) {
                testEachName(allFeeds[i]);
            }
        });


    });


    //Test suite for the Menu
    describe('Menu', function () {

        //testing that the menu element is hidden by default
        //this is the case when the body has the class menu-hidden

        it('is hidden by default', function () {
            expect($('body').hasClass('menu-hidden')).toBe(true);

        });


        //testing that the menu changes visibility, hence that
        //it becomes visible when the menu icon is clicked on
        //and that it disappears when clicked again

        it('changes visibility when clicked', function () {

            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(false);

            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(true);

        })

    });


    //Test suite for the Initial Entries
    describe('Initial Entries', function () {

        //testing that when the loadFeed function is called and completes
        //it's work, there is at least a single .entry elemeent within the
        //.feed container. Because loadFeed() is asynchronous Jasmine's
        //beforeEach and done() function are used to ensure that loadFeed
        //is fully loaded before running the test

        beforeEach(function (done) {
            loadFeed(0, function () {
                done();
            })
        })

        it('have at least one feed element', function (done) {
            expect($('.feed .entry').length).toBeGreaterThan(0);
            done();
        })
    })


    //Test suite for the New Feed Selection"
    describe('New Feed Selection', function () {

        //testing that when a new feed is loaded by the loadFeed function
        //that the content actually changes. As before, because loadFeed()
        //is asynchronous, the beforeEach() and done() function are used

        let feed0, feed1;

        beforeEach(function (done) {
            loadFeed(0, function () {
                feed0 = $('.entry-link').html();
                loadFeed(1, function () {
                    feed1 = $('.entry-link').html();
                    done();
                });
            });
        });

        it('has changing contents', function (done) {
            expect(feed0).not.toBe(feed1);
            done();
        })
    })


}());
