package com.dekker.spring.models;

import java.util.List;

public class Response {
    private String status;
    private List data;

    public Response(String status, List data) {
        this.status = status;
        this.data = data;
    }

    public Response(String status) {
        this.status = status;
      
    }
    public String getStatus() {
        return status;
    }
    public void setStatus(String status) {
        this.status = status;
    }

    public List getData(){
        return data;
    }

    public void setData(List data) {
        this.data = data;
    }
}
