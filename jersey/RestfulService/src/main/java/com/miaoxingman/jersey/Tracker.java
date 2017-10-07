package com.miaoxingman.jersey;

import javax.xml.bind.annotation.XmlRootElement;

public class Tracker {

    public Tracker() {
    }

    @Override
    public String toString() {
        return "Tracker [title=" + title + ", singer=" + singer + "]";
    }
    public String getTitle() {
        return title;
    }
    public void setTitle(String title) {
        this.title = title;
    }
    public String getSinger() {
        return singer;
    }
    public void setSinger(String singer) {
        this.singer = singer;
    }
    String title;
    String singer;
}
