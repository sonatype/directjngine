package com.softwarementors.extjs.djn.test;

import java.lang.reflect.Method;
import java.util.List;
import java.util.Map;

import com.google.gson.reflect.TypeToken;
import com.softwarementors.extjs.djn.api.Registry;
import com.softwarementors.extjs.djn.config.annotations.DirectMethod;
import com.softwarementors.extjs.djn.test.helper.GenericTestObject;

public class DeserializationToGenericTypesTest {
  private static void provideSupportForMethodTakingGenericParameters() throws NoSuchMethodException {
    Method method;
    method = DeserializationToGenericTypesTest.class.getMethod("test_GenericObject", GenericTestObject.class, GenericTestObject.class);
    Registry.registerParameterType(method, 0, new TypeToken<GenericTestObject<String> >() {/*Empty on purpose*/}.getType());
    Registry.registerParameterType(method, 1, new TypeToken<GenericTestObject<MyClass2>>() {/*Empty on purpose*/}.getType());

    method = DeserializationToGenericTypesTest.class.getMethod("test_GenericCollections", List.class, List.class);
    Registry.registerParameterType(method, 0, new TypeToken<List<String> >() {/*Empty on purpose*/}.getType());
    Registry.registerParameterType(method, 1, new TypeToken<List<MyClass2>>() {/*Empty on purpose*/}.getType());

    method = DeserializationToGenericTypesTest.class.getMethod("test_GenericComplexObject", List.class);
    Registry.registerParameterType(method, 0, new TypeToken<List<GenericTestObject<List<GenericTestObject<String>>>>>() {/*Empty on purpose*/}.getType());
    
    method = DeserializationToGenericTypesTest.class.getMethod("test_MapWithGenericValue", Map.class);
    Registry.registerParameterType(method, 0, new TypeToken<Map<String,GenericTestObject<String>>>() {/*Empty on purpose*/}.getType());
    
    method = DeserializationToGenericTypesTest.class.getMethod("test_genericListReceivingSingleJsonObjectGeneratesSingleItemList", List.class);
    Registry.registerParameterType(method, 0, new TypeToken<List<MyClass2>>() {/*Empty on purpose*/}.getType());
    
    method = DeserializationToGenericTypesTest.class.getMethod("test_genericListReceivingSinglePrimitiveStringGeneratesSingleItemList", List.class);
    Registry.registerParameterType(method, 0, new TypeToken<List<String>>() {/*Empty on purpose*/}.getType());
  }
  
  static {
    try {
      provideSupportForMethodTakingGenericParameters();
    }
    catch (SecurityException e) {
      throw new RuntimeException(e);
    }
    catch (NoSuchMethodException e) {
      throw new RuntimeException(e);
    }
  }
  
  public static class MyClass2 {
    public int a;
    public String b;
  }
  
  @edu.umd.cs.findbugs.annotations.SuppressWarnings( value="NP_UNWRITTEN_PUBLIC_OR_PROTECTED_FIELD", justification="The specified fields are filled by remote javascript")
  @DirectMethod
  public GenericTestObject<MyClass2> test_GenericObject(GenericTestObject<String> param1, GenericTestObject<MyClass2> param2) {
    if( !param1.value.equals("hello") ) {
      throw new DirectTestFailedException( "We expected 'hello'" );
    }
    if( param2.value.a != 17 ) {
      throw new DirectTestFailedException( "We expected 17" );
    }
    if( !param2.value.b.equals("bye") ) {
      throw new DirectTestFailedException( "We expected 'bye'" );
    }
    return param2;
  }
  
  @edu.umd.cs.findbugs.annotations.SuppressWarnings( value="NP_UNWRITTEN_PUBLIC_OR_PROTECTED_FIELD", justification="The specified fields are filled by remote javascript")
  @DirectMethod
  public List<MyClass2> test_GenericCollections(List<String> param1, List<MyClass2> param2) {
    if( param1.size() != 2 || !param1.get(0).equals("a") || !param1.get(1).equals("b") ) {
      throw new DirectTestFailedException( "We expected a list with 'a' and 'b' strings" );
    }
    if( param2.size() != 2 || param2.get(0).a != 1 || !param2.get(0).b.equals("a") || param2.get(1).a != 2 || !param2.get(1).b.equals("b")  ) {
      throw new DirectTestFailedException( "We expected a list with two MyClass2 items" );
    }
    return param2;
  }
  
  public static class MyClassWithGenerics {
    public int i;
    public List<String> list;
  }

  @edu.umd.cs.findbugs.annotations.SuppressWarnings( value="NP_UNWRITTEN_PUBLIC_OR_PROTECTED_FIELD", justification="The specified fields are filled by remote javascript")
  @DirectMethod
  public MyClassWithGenerics test_JsonObjectInObjectContainingGenerics(MyClassWithGenerics param) {
    if( param.i != 84 ) {
      throw new DirectTestFailedException( "We expected 84" );
    }
    if( param.list.size() != 2 || !param.list.get(0).equals("hi") || !param.list.get(1).equals("bye")  ) {
      throw new DirectTestFailedException( "We expected a list with 'hi' and 'bye'" );
    }
    return param;
  }
  
  @DirectMethod
  public List<GenericTestObject<List<GenericTestObject<String>>>> test_GenericComplexObject(List<GenericTestObject<List<GenericTestObject<String>>>> param) {
    if( param.size() != 2 || !param.get(0).value.get(0).value.equals("hello") || param.get(1) != null  || param.get(0).value.get(1) != null) {
      throw new DirectTestFailedException( "We expected different values" );
    }
    return param;
  }
  
  @DirectMethod
  public Map<String,GenericTestObject<String>> test_MapWithGenericValue(Map<String,GenericTestObject<String>> param) {
    if( param.size() != 2 || !param.get("a").value.equals("hello") || !param.get("b").value.equals("bye")  ) {
      throw new DirectTestFailedException( "We expected different values" );
    }
    return param;
  }
  
  @DirectMethod
  public List<String> test_genericListReceivingSinglePrimitiveStringGeneratesSingleItemList(List<String> param) {
    if( param.size() != 1 || !param.get(0).equals("hi") ) {
      throw new DirectTestFailedException( "We expected different values" );
    }
    return param;
  }
  
  @edu.umd.cs.findbugs.annotations.SuppressWarnings( value="NP_UNWRITTEN_PUBLIC_OR_PROTECTED_FIELD", justification="The specified fields are filled by remote javascript")
  @DirectMethod
  public List<MyClass2> test_genericListReceivingSingleJsonObjectGeneratesSingleItemList(List<MyClass2> param) {
    if( param.size() != 1 || param.get(0).a != 1 && !param.get(0).b.equals("a") ) {
      throw new DirectTestFailedException( "We expected different values" );
    }
    return param;
  }
}
