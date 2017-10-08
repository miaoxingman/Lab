package com.miaoxingman;

import org.testng.Assert;
import org.testng.annotations.Test;

/**
 * Unit test for simple App.
 */
public class TestApp
{
    @Test()
    public void testEmailGenerator() {
        App app = new App();
        String email = app.generateEmail();

        Assert.assertNotNull(email);
        Assert.assertEquals(email, "miaoxingman@gmail.com");
    }
}
