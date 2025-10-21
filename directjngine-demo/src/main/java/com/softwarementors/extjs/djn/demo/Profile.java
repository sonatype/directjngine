/*
 * Copyright © 2008, 2012 Pedro Agulló Soliveres.
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

import java.util.HashMap;
import java.util.Map;

import org.apache.commons.fileupload2.core.FileItem;

import com.softwarementors.extjs.djn.config.annotations.DirectFormPostMethod;
import com.softwarementors.extjs.djn.config.annotations.DirectMethod;

public class Profile {

  // Dynamic data: the data itself is a dynamic map, so we can return arbitrary data!
  public static class LocationInfo  {
    public boolean success = true;    
    public Map<String, String> data = new HashMap<String,String>();
    
  }
  
  // Fixed format data: the data itself is an inner Data class
  public static class PhoneInfo {
    public static class Data {
      public String cell;
      public String office;
      public String home;
    }
    
    public boolean success = true;    
    public Data data = new Data();
  }
  
  // Fixed format data: the data itself is an inner Data class
  public static class BasicInfo {
    public static class Data {
      public String foo;
      public String name;
      public String company;
      public String email;
    }

    public boolean success = true;    
    public Data data = new Data();
  }
  
  @DirectMethod
  public BasicInfo getBasicInfo( Long userId, String foo ) {
    assert userId != null;
    assert foo != null;
    
    BasicInfo result = new BasicInfo();
    result.data.foo = foo;
    result.data.name = "Aaron Conran";
    result.data.company = "Ext JS, LLC";
    result.data.email = "aaron@extjs.com";
    return result;
  }
  
  @DirectMethod
  public PhoneInfo getPhoneInfo( Long userId ) {
    assert userId != null;

    PhoneInfo result = new PhoneInfo();
    result.data.cell = "443-555-1234";
    result.data.office = "1-800-CALLEXT";
    result.data.home = "";
    return result;    
  }
  
  @DirectMethod
  public LocationInfo getLocationInfo( Long userId ) {
    assert userId != null;
    
    LocationInfo result = new LocationInfo();
    result.data.put( "street", "1234 Red Dog Rd.");
    result.data.put( "city", "Seminole");
    result.data.put( "state", "FL");
    result.data.put( "zip", "33776");
    return result;
  }
  
  private static class SubmitResult {
    public boolean success = true;
    public Map<String, String> errors;
    @SuppressWarnings("unused")
    public Map<String,String> debug_formPacket;
  }
  
  @DirectFormPostMethod
  public SubmitResult updateBasicInfo( Map<String, String> formParameters, Map<String, FileItem<?>> fileFields ) {
    assert formParameters != null;
    assert fileFields != null;
    
    SubmitResult result = new SubmitResult(); 

    String email = formParameters.get( "email");
    result.success = !email.equals("aaron@extjs.com");
    if( !result.success ) {
      result.errors = new HashMap<String,String>();
      result.errors.put( "email", "already taken");
    }
    
    result.debug_formPacket = formParameters;
    return result;
  }
}
