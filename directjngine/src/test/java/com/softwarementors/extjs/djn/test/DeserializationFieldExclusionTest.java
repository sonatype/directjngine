package com.softwarementors.extjs.djn.test;

import java.util.Collection;
import java.util.List;

import com.softwarementors.extjs.djn.config.annotations.DirectMethod;
import com.softwarementors.extjs.djn.gson.JsonDeserializationManager;
import com.softwarementors.extjs.djn.test.ServerMethodReturnTest.Base;
import com.softwarementors.extjs.djn.test.ServerMethodReturnTest.Derived;

public class DeserializationFieldExclusionTest {
  public static class MyThing {
    public int i;
    public String s;
    public MyThing t;
    
    public MyThing(int i, String s ) {
       this.i = i;
       this.s = s;
    }
  }
   
  @DirectMethod
  public MyThing test_primitiveFieldExclusion(MyThing param) {
    JsonDeserializationManager mgr = JsonDeserializationManager.getManager();
    mgr.excludeFieldPaths("i");
    
    return param;
  }

  @DirectMethod
  public MyThing test_objectFieldExclusion(MyThing param) {
    JsonDeserializationManager mgr = JsonDeserializationManager.getManager();
    mgr.excludeFieldPaths("t");
    
    return param;
  }

  public static class WithArray {
    public int i;
    public int[] a;
  }
  
  @DirectMethod
  public WithArray test_arrayFieldExclusion(WithArray param) {
    JsonDeserializationManager mgr = JsonDeserializationManager.getManager();
    mgr.excludeFieldPaths("a");
    
    return param;
  }

  
  @DirectMethod
  public Base test_fieldInDerivedClassFieldExclusion() {
    Base result = new Derived("b", 33);
    JsonDeserializationManager mgr = JsonDeserializationManager.getManager();
    mgr.excludeFieldPaths("v2");
    
    return result;
  }
  
  @DirectMethod
  public MyThing test_nullFieldExclusion(MyThing param) {
    JsonDeserializationManager mgr = JsonDeserializationManager.getManager();
    mgr.excludeFieldPaths("s");
    
    return param;
  }

  @DirectMethod
  public MyThing test_multipleFieldExclusion(MyThing param) {
    JsonDeserializationManager mgr = JsonDeserializationManager.getManager();
    mgr.excludeFieldPaths("s", "i");
    mgr.excludeFieldPaths("t");
    
    return param;
  }

  @DirectMethod
  public MyThing test_nestedFieldExclusion(MyThing param) {
    JsonDeserializationManager mgr = JsonDeserializationManager.getManager();
    mgr.excludeFieldPaths("s", "i");
    mgr.excludeFieldPaths("t.s", "t.i");
    
    return param;
  }

  @DirectMethod
  public MyThing test_allFieldsExclusion(MyThing param) {
    JsonDeserializationManager mgr = JsonDeserializationManager.getManager();
    mgr.excludeFieldPaths("s", "i", "t.s", "t.i", "t.t");
    
    return param;
  }

/*  
  @DirectMethod
  public MyThing test_fieldExclusionForNestedObject(MyThing param) {
    JsonDeserializationManager mgr = JsonDeserializationManager.getManager();
    mgr.excludeFieldPaths("s");
    mgr.excludeObjectFieldPaths(param.t, "i");
    mgr.excludeObjectFieldPaths(param.t.t, "s"); // Has no effect, for param.t.t == null
    
    return param;
  }
*/  

  @DirectMethod
  public MyThing test_veryDeepFieldExclusion(MyThing param) {
    JsonDeserializationManager mgr = JsonDeserializationManager.getManager();
    mgr.excludeFieldPaths("t.t.t.s");
    
    return param;
  }
  
  public static class ClassWithManyValued {
    public int i;
    public String[] a;
    public Collection<String> c;
    public List<String> l;
    public ClassWithManyValued m;
  }
  
  @DirectMethod
  public ClassWithManyValued test_manyValuedFieldsExclusion(ClassWithManyValued param) {
    JsonDeserializationManager mgr = JsonDeserializationManager.getManager();
    mgr.excludeManyValuedFields();
    
    return param;
  }
  
}
