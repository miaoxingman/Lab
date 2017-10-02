package com.miaoxingman.app;
import org.apache.http.HttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.DefaultHttpClient;

import org.apache.log4j.Logger;

/**
 * Hello world!
 *
 */
public class App 
{
    private static Logger log = Logger.getLogger(App.class);

    public static void httpclient_test() throws Exception {
    		DefaultHttpClient httpclient = new DefaultHttpClient();
        HttpGet httpget = new HttpGet("https://portal.sun.com/portal/dt");

        HttpResponse response = httpclient.execute(httpget);
        System.out.println("Login form get: " + response.getStatusLine());
    }
    
    public static void main( String[] args )
    {
        log.debug("Hello World!");
        try {
        		httpclient_test();
        } catch (Exception e) {
        	log.debug(e.getMessage());
        }
    }
}
