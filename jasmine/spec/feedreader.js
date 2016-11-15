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
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('all feeds have a non empty "URL" attribute', function() {
          allFeeds.forEach(function(feed) {
            expect(feed.url).toBeDefined();
            expect(feed.url).not.toBe('');
          });
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         it('all feeds have a non empty "name" attribute', function() {
           allFeeds.forEach(function(feed) {
             expect(feed.name).toBeDefined();
             expect(feed.name).not.toBe('');
           });
         });
    });


    /* TODO: Write a new test suite named "The menu" */
    describe('The Menu', function() {
        var menuIconLink = $('.menu-icon-link'),
            slideMenu = $('.slide-menu'),
            body = $('body');


        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
         it('hides the sliding menu element by default on page load', function() {
             // Vheck that the menu-hidden class has been added.
            expect( body.hasClass('menu-hidden') ).toBe(true);
            // Double check the menu is hidden by ensuring that its position is off the screen.
            expect( slideMenu.position().left < 0 ).toBe(true);
         });

         /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
         it('displays the menu when the menu icon is clicked and then hides it on a second click', function() {
             // Trigger a click on the menu icon.
            menuIconLink.trigger('click');
            expect( body.hasClass('menu-hidden') ).toBe(false);

            // Trigger the second click.
            menuIconLink.trigger('click');
            expect( body.hasClass('menu-hidden') ).toBe(true);

         });
    });

    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function() {
        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */

         // Call the loadFeed function on one of the feeds (0 is the init feed). Once it is complete call Jasmine done() as it's callback.
         // This will trigger the 'it' test.
         beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            });
         });

        // Check that the jQuery nodelist search returns at least one result for "entry" nodes in the "feed" div.
        it('checks to make sure at least one entry has loaded from the feed', function(done) {
            expect( $('.feed .entry').length > 0 ).toBe(true);
            done();
        });
    });

    /* TODO: Write a new test suite named "New Feed Selection"

        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
    describe('New Feed Selection', function() {
        var firstFeedContent, secondFeedContent;

        beforeEach(function(done) {
            // Call the loadFeed function to populate the test DOM with articles from feed 0.
           loadFeed(0, function() {
               // Get the innerText of the title of the first article.
               firstFeedContent = $('.feed .entry').find('h2')[0].innerText;
               // Then call loadFeed again on a different feed index - passing along the Jasmine done function as its optional callback.
               loadFeed(1, done);
           });
        });

        it('checks that content changes after calling loadFeed on non initial feed', function(done) {
            // Once the beforeEach calls are completed - get the innerText of the title of the first article now displaying.
            secondFeedContent = $('.feed .entry').find('h2')[0].innerText;
            // Check that both variables have been defined correctly for testing.
            expect(firstFeedContent).toBeDefined();
            expect(secondFeedContent).toBeDefined();
            // Check to see that the content has changed.
            expect( firstFeedContent == secondFeedContent ).toBe(false);
            done();
        });
    });

}());
