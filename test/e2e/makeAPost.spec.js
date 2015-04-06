describe("making a post", function () {

  it("logs in and creates a new post", function () {

    // go home
    browser.get("http://localhost:3001");
    // click login
    element(by.css("nav .login")).click();

    // fill out login form
    element(by.model("username")).sendKeys("test");
    element(by.model("password")).sendKeys("test");
    element(by.css("form .btn")).click();
    // submit a new post page

    // user should now see there their post as the first post on the page

  })


});