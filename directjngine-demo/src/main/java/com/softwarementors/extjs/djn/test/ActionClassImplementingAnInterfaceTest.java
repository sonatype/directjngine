package com.softwarementors.extjs.djn.test;

import com.softwarementors.extjs.djn.config.annotations.DirectMethod;

interface AnInterface {
  String callMethodInClassImplementingAnInterface( String name );
}

public class ActionClassImplementingAnInterfaceTest implements AnInterface {

  @DirectMethod
  public String callMethodInClassImplementingAnInterface(String name) {
    return "Hello, " + name;
  }

}
