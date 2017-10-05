package com.miaoxingman;

import javax.ws.rs.core.MediaType;
import com.sun.jersey.api.client.*;

/**
 * Jersey client example.
 *
 */
public class App 
{
    public static void main( String[] args )
    {
        System.out.println( "App Enter!" );
        try {
            Client client = Client.create();
            WebResource webResource = client
                    .resource("http://localhost:8080/JerseyExample/rest/hello");
            ClientResponse response = webResource.accept(javax.ws.rs.core.MediaType.APPLICATION_JSON)
                    .get(ClientResponse.class);
            if (response.getStatus() != 200) {
                throw new RuntimeException("Failed : HTTP error code : "
                        + response.getStatus());
            }

            String output = response.getEntity(String.class);
            System.out.println("Output from Server .... \n");
            System.out.println(output);
        } catch (Exception e) {
            e.printStackTrace();
        }
        System.out.println( "App Leave!" );
    }
}
