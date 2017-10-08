package com.miaoxingman;

import org.testng.Assert;

import org.testng.annotations.AfterClass;
import org.testng.annotations.AfterGroups;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.BeforeGroups;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;

/**
 * Unit test for simple App.
 */
public class TestApp
{
    @BeforeGroups("shopping")
    public void beforeGroups() {
        System.out.println("@BeforeGroups");
    }

    @AfterGroups("shopping")
    public void afterGroups() {
        System.out.println("@AfterGroups");
    }

    @BeforeClass
    public void beforeClass() {
        System.out.println("@BeforeClass");
    }

    @AfterClass
    public void afterClass() {
        System.out.println("@AfterClass");
    }

    @BeforeMethod
    public void beforeMethod() {
        System.out.println("@BeforeMethod");
    }

    @AfterMethod
    public void afterMethod() {
        System.out.println("@AfterMethod");
    }

    @Test(groups = "shopping")
    public void testEmailGenerator() {
        App app = new App();
        String email = app.generateEmail();

        System.out.println("@Test - testEmailGenerator");

        Assert.assertNotNull(email);
        Assert.assertEquals(email, "miaoxingman@gmail.com");
    }

    @Test
    public void dummyTest() {
        System.out.println("@Test - dummyTest");
    }

    @Test(expectedExceptions = Exception.class)
    public void exceptionTest() throws Exception {
        System.out.println("@Test - exceptionTest");
        throw new Exception();
    }

    @Test(enabled = true)
    public void testEnabled() {
        Assert.assertEquals(true, true);
        System.out.println("@Test - testEnabled");
    }

    @Test(enabled = false)
    public void testDisabled() {
        Assert.assertEquals(true, true);
        System.out.println("@Test - testDisabled");
    }

    @Test(timeOut = 5000) // time in mulliseconds
    public void testThisShouldPass() throws InterruptedException {
        System.out.println("@Test - testThisShouldPass");
        Thread.sleep(4000);
    }

    @Test(timeOut = 1000)
    public void testThisShouldFail() {
        System.out.println("@Test - testThisShouldFail");
        while (true);
    }
}
