/*
 * Copyright © 2008, 2015 Pedro Agulló Soliveres.
 * 
 * This file is part of DirectJNgine.
 *
 * DirectJNgine is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License.
 *
 * Commercial use is permitted to the extent that the code/component(s)
 * do NOT become part of another Open Source or Commercially developed
 * licensed development library or toolkit without explicit permission.
 *
 * DirectJNgine is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with DirectJNgine.  If not, see <http://www.gnu.org/licenses/>.
 * 
 * This software uses the ExtJs library (http://extjs.com), which is 
 * distributed under the GPL v3 license (see http://extjs.com/license).
 */

package com.softwarementors.extjs.djn.demo;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.softwarementors.extjs.djn.config.annotations.DirectMethod;

public class TestAction {
  @DirectMethod
  public String doEcho( String data ) {
    return data;
  }
  
  @DirectMethod
  public double multiply( String num ) {
    double num_ = Double.parseDouble(num);
    return num_ * 8.0;
  }
  
  public static class Data {
    public String firstName;
    public String lastName;
    public int age;
  }
  
  @DirectMethod
  public String showDetails( Data data ) {
    return "Hi " + data.firstName + " " + data.lastName + ", you are " + data.age + " years old.";
  }
  
  public static class Node {
    public String id;
    public String text;
    public boolean leaf;
  }
  
  @DirectMethod 
  public List<Node> getTree( String id) {
    List<Node> result = new ArrayList<Node>();
    if( id.equals("root")) {
      for( int i = 1; i <= 5; ++i ) {
        Node node = new Node();
        node.id = "n" + i;
        node.text = "Node " + i;
        node.leaf = false;
        result.add(node);
      }
    }
    else if( id.length() == 2) {
      String num = id.substring(1);
      for( int i = 1; i <= 5; ++i ) {
        Node node = new Node();
        node.id = id + i;
        node.text = "Node " + num + "." + i;
        node.leaf = true;
        result.add(node);
      }
    }
    return result;
  }
  
  public static class GridRow {
    public GridRow( String name, int revenue) {
      this.name = name;
      this.revenue = revenue;
    }
    
    public String name;
    public int revenue;
  }
  
  public static class SortInfo {
    public String property;
    public String direction;
  }
  
  @DirectMethod
  public List<GridRow> getGrid( JsonArray params ) {
    // We know this is the structure, but the 'right' way to do this is
    // to define a Java class that maps the information we are receiving
    JsonObject sortInfo = (JsonObject)params.get(0).getAsJsonObject().get("sort").getAsJsonArray().get(0);

    assert sortInfo != null;
    List<GridRow> data = new ArrayList<GridRow>();
    String sortField = sortInfo.get("property" ).getAsString();
    String sortDirection = sortInfo.get("direction" ).getAsString();

    String table = params.get(0).getAsJsonObject().get("table").getAsString();
    
    if( table.equals("customers") ) {
       if( sortField.equals("name")) {
         data.add( new GridRow("ABC Accounting", 50000));
         data.add( new GridRow("Ezy Video Rental", 106300));
         data.add( new GridRow("Greens Fruit Grocery", 120000));
         data.add( new GridRow("Icecream Express", 73000));
         data.add( new GridRow("Ripped Gym", 88400));
         data.add( new GridRow("Smith Auto Mechanic", 222980));
       }
       else {
         data.add( new GridRow("ABC Accounting", 50000));
         data.add( new GridRow("Icecream Express", 73000));
         data.add( new GridRow("Ripped Gym", 88400));
         data.add( new GridRow("Ezy Video Rental", 106300));
         data.add( new GridRow("Greens Fruit Grocery", 120000));
         data.add( new GridRow("Smith Auto Mechanic", 222980));
       }
    }
    else /*if(table.equals("leads"))*/ {
       if( sortField.equals("name")) {
          data.add( new GridRow("AT&T Inc.", 10000000));
          data.add( new GridRow("General Electric", 50000000));
          data.add( new GridRow("Intel Corporation", 150000000));
          data.add( new GridRow("Verizon Communications", 3000000));
       }
       else {
          data.add( new GridRow("Intel Corporation", 150000000));
          data.add( new GridRow("General Electric", 50000000));
          data.add( new GridRow("AT&T Inc.", 10000000));
          data.add( new GridRow("Verizon Communications", 3000000));
       }
    }

    if( sortDirection.equals( "DESC")) {
       Collections.reverse(data);
     }
    return data;
  }  
}
