package com.miaoxingman.jersey;

import javax.ws.rs.core.MediaType;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;

import com.miaoxingman.jersey.Tracker;
 
@Path("/hello")
@Produces({MediaType.APPLICATION_JSON})
public class HelloRS {
 
    @GET
    public Tracker sayHelloWorld() {
        Tracker track = new Tracker();
        track.setSinger("miao~");
        track.setTitle("Eat fish everyday.");
        return track;
    }

    @GET
    @Path("/{name}")
    public String sayHello(@PathParam("name") String name) {
        return "Hello, " + name;
    }
}