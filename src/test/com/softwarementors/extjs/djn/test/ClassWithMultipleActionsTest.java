package com.softwarementors.extjs.djn.test;

import com.softwarementors.extjs.djn.config.annotations.DirectAction;
import com.softwarementors.extjs.djn.config.annotations.DirectMethod;

@DirectAction( action={"action1","action2"})
public class ClassWithMultipleActionsTest {
  @DirectMethod
  public int getValue() {
    return 25;
  }
}
