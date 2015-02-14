package com.softwarementors.extjs.djn.test;

import java.util.List;
import java.util.Map;

import com.softwarementors.extjs.djn.config.annotations.DirectMethod;

public class DeserializationToUntypedObjectsTest {
  @DirectMethod
  public Object test_JsonPrimitiveNumberInObject( Object param ) {
    if( !(param instanceof Double)) {
      throw new DirectTestFailedException( "We expected a number 3" );
    }
    if( ((Number)param).doubleValue() != 3.0 ) {
      throw new DirectTestFailedException( "We expected a value of 3" );
    }
    
    return param;
  }
  
  @DirectMethod
  public Object test_JsonPrimitiveStringInObject( Object param ) {
    if( !(param instanceof String)) {
      throw new DirectTestFailedException( "We expected a String" );
    }
    if( !"str".equals( param) ) {
      throw new DirectTestFailedException( "We expected a value of 'str'" );
    }
    
    return param;
  }
  
  @DirectMethod
  public Object test_JsonNullInObject( Object param ) {
    if( param != null ) {
      throw new DirectTestFailedException( "We expected a null value" );
    }
    
    return param;
  }

  @DirectMethod
  public Object test_JsonBooleanInObject( Object param ) {
    if( !(param instanceof Boolean)) {
      throw new DirectTestFailedException( "We expected a Boolean" );
    }
    if( !Boolean.valueOf(true).equals( param) ) {
      throw new DirectTestFailedException( "We expected a value of true" );
    }
    
    return param;
  }
  
  @SuppressWarnings("unchecked") // Because we perfrom a type check that is not meaningful due to type erasure --but good for documentation
  @DirectMethod
  public Object test_JsonObjectInObject( Object param ) {
    if( !(param instanceof Map<?,?>)) {
      throw new DirectTestFailedException( "We expected a map" );
    }
    Map<String,Object> values = (Map<String,Object>)param;
    if( values.size() != 2 ) {
      throw new DirectTestFailedException( "We expected two entries in the map" );
    }
    if( !values.containsKey("a")) {
      throw new DirectTestFailedException( "We expected an 'a' key" );
    }
    if( !values.containsKey("b")) {
      throw new DirectTestFailedException( "We expected a 'b' key" );
    }
    Object valueA = values.get("a");
    if( !valueA.equals(Double.valueOf(1))) {
      throw new DirectTestFailedException( "We expected a value of '1' for key 'a' " );
    }
    Object valueB = values.get("b");
    if( !valueB.equals("hello")) {
      throw new DirectTestFailedException( "We expected a value of 'hello' for key 'b' " );
    }
    
    return param;
  }
    
  @DirectMethod
  public Object test_JsonArrayInObject( Object param ) {
    if( !(param instanceof Object[])) {
      throw new DirectTestFailedException( "We expected an array of Object" );
    }
    
    Object[] values = (Object[])param;
    if( values.length != 4 ) {
      throw new DirectTestFailedException( "We expected four entries in the array" );
    }
    
    Object value0 = values[0];
    Object value1 = values[1];
    Object value2 = values[2];
    Object value3 = values[3];
    
    if( !value0.equals(Double.valueOf(3.5))) {
      throw new DirectTestFailedException( "We expected a value of '3.5' for first element" );
    }
    if( value1 != null) {
      throw new DirectTestFailedException( "We expected a null value for second element" );
    }
    if( !value2.equals("hello")) {
      throw new DirectTestFailedException( "We expected a value of 'hello' for third element" );
    }
    if( !value3.equals(Boolean.valueOf(true))) {
      throw new DirectTestFailedException( "We expected a value of 'true' for fourth element" );
    }
    return param;
  }
  
  @SuppressWarnings("unchecked") // Because we perform a type check that is not meaningful due to type erasure --but good for documentation
  @DirectMethod
  public Object test_JsonArrayWithDifferentJsonTypesInObject( Object param ) {
    if( !(param instanceof Object[])) {
      throw new DirectTestFailedException( "We expected an array of Object" );
    }
    
    Object[] values = (Object[])param;
    if( values.length != 6 ) {
      throw new DirectTestFailedException( "We expected four entries in the array" );
    }
    
    Object value0 = values[0];
    Object value1 = values[1];
    Object value2 = values[2];
    Map<String,Object> value3 = (Map<String,Object>)values[3];
    Object[] value4 = (Object[])values[4];
    
    Object value5 = values[5];
    
    if( !value0.equals(Double.valueOf(3.5))) {
      throw new DirectTestFailedException( "We expected a value of '3.5' for first element" );
    }
    if( value1 != null) {
      throw new DirectTestFailedException( "We expected a null value for second element" );
    }
    if( !value2.equals("hello")) {
      throw new DirectTestFailedException( "We expected a value of 'hello' for third element" );
    }
    if( !value3.get("a").equals(Double.valueOf(1))) {
      throw new DirectTestFailedException( "We expected a value of 1" );
    }
    if( !value3.get("b").equals(Boolean.valueOf(true))) {
      throw new DirectTestFailedException( "We expected a value of true" );
    }
    Object[] valueC = (Object[])value3.get("c");
    if( !valueC[0].equals(Double.valueOf(5))) {
      throw new DirectTestFailedException( "We expected a value of 5" );
    }
    if( !valueC[1].equals("h")) {
      throw new DirectTestFailedException( "We expected a value of 'h'" );
    }
    
    assert( value4 != null);
   
    if( !value5.equals(Boolean.valueOf(true))) {
      throw new DirectTestFailedException( "We expected a value of 'true' for fourth element" );
    }
    return param;
  }

  @DirectMethod
  public Object[] test_JsonArrayInObjectArray( Object[] param ) {
    if( param.length != 3) {
      throw new DirectTestFailedException( "We expected 3 items in the array" );
    }
    if( !param[0].equals("abc") ) {
      throw new DirectTestFailedException( "We expected a value of 'abc' for the first element" );
    }

    if( !param[1].equals(Double.valueOf(33)) ) {
      throw new DirectTestFailedException( "We expected a value of 33 for the second element" );
    }
    return param; 
  }
  
  @SuppressWarnings("unchecked") // To be able to "cast" to Map<String,Object>
  @DirectMethod
  public Object[] test_JsonObjectInObjectArray( Object[] param ) {
    if( param.length != 1) {
      throw new DirectTestFailedException( "We expected 1 items in the array" );
    }

    Map<String,Object> obj = (Map<String,Object>)param[0];
    if( obj.size() != 2 && obj.get("a").equals( "1" ) && obj.get("b").equals("2" ) ) {
      throw new DirectTestFailedException( "We expected a different value" );
    }
    return param; 
  }

  @DirectMethod
  public Object[] test_JsonObjectPrimitiveNumberInObjectArray( Object[] param ) {
    if( param.length != 1) {
      throw new DirectTestFailedException( "We expected 1 items in the array" );
    }

    if( !param[0].equals( Double.valueOf(3.5) ) ) {
      throw new DirectTestFailedException( "We expected a different value" );
    }
    return param; 
  }

  @DirectMethod
  public Object[] test_JsonNullInObjectArray( Object[] param ) {
    if( param != null ) {
      throw new DirectTestFailedException( "We expected a different value" );
    }
    return param; 
  }

  @DirectMethod
  public Map<String,Object> test_JsonObjectInStringMap( Map<String,Object> param ) {
    if( param.size() != 3 ) {
      throw new DirectTestFailedException( "We expected 3 items in the map" );
    }
    if( !param.get("aKey").equals("aValue") ) {
      throw new DirectTestFailedException( "We expected a value of 'aValue' for the 'aKey' key" );
    }
    if( !param.get("key2").equals(Double.valueOf(5)) ) {
      throw new DirectTestFailedException( "We expected a value of 5 for the 'key2' key" );
    }
    return param; 
  }

  @DirectMethod
  public Map<String,Object> test_JsonPrimitiveNumberInStringMap_fails( @SuppressWarnings("unused") Map<String,Object> param ) {
    throw new DirectTestFailedException( "We did not expect this to be handled" );
  }

  @DirectMethod
  public Map<String,Object> test_JsonNullInStringMap( Map<String,Object> param ) {
    if( param != null ) {
      throw new DirectTestFailedException( "We expected a different value" );
    }
    return param; 
  }

  @DirectMethod
  public List<Object> test_JsonArrayInListUntyped(List<Object> param) {
    if( param.size() != 2 || !param.get(0).equals("a") && !param.get(1).equals("b") ) {
      throw new DirectTestFailedException( "We expected a different value" );
    }
    return param; 
  }

  @DirectMethod
  public List<Object> test_JsonObjectInListUntyped(List<Object> param) {
    if( param.size() != 1 || !param.get(0).equals("a") ) {
      throw new DirectTestFailedException( "We expected a different value" );
    }
    return param; 
  }

  /************************************************************
   * 
   * The following test refer to FIELDS, not parameters. This
   * might be an issue, due to the subtleties of Gson and
   * my own 'magic' processing, so I prefer to have tests 
   * 
   ************************************************************/
  public static class TypeWithObjectField {
    public int i;
    public Object obj;
  }
  
  @SuppressWarnings("unchecked")
  @edu.umd.cs.findbugs.annotations.SuppressWarnings( value="NP_UNWRITTEN_PUBLIC_OR_PROTECTED_FIELD", justification="The specified fields are filled by remote javascript")
  @DirectMethod
  public TypeWithObjectField test_JsonObjectInObjectField( TypeWithObjectField param ) {
    if( param.i != 33 ) {
      throw new DirectTestFailedException( "We expected 33" );
    }
    
    Map<String,Object> obj = (Map<String,Object>)param.obj;
    if( obj.size() != 2 || !obj.get("a").equals( Double.valueOf(1.0)) || !obj.get("b").equals("anStr") ) {
      throw new DirectTestFailedException( "We expected {a:1,b:'anStr'}" );
    }
    
    return param;
  }
  
  public static class TypeWithObjectArrayField {
    public int i;
    public Object[] obj;
  }
  
  @edu.umd.cs.findbugs.annotations.SuppressWarnings( value="NP_UNWRITTEN_PUBLIC_OR_PROTECTED_FIELD", justification="The specified fields are filled by remote javascript")
  @DirectMethod
  public TypeWithObjectArrayField test_JsonArrayInObjectArrayField( TypeWithObjectArrayField param ) {
    if( param.i != 33 ) {
      throw new DirectTestFailedException( "We expected 33" );
    }
    
    if( param.obj.length != 2 || !param.obj[0].equals( Double.valueOf(1.0)) || !param.obj[1].equals("anStr") ) {
      throw new DirectTestFailedException( "We expected different values" );
    }
    
    return param;
  }

  public static class TypeWithObjectListField {
    public int i;
    public Object[] obj;
  }
  
  @edu.umd.cs.findbugs.annotations.SuppressWarnings( value="NP_UNWRITTEN_PUBLIC_OR_PROTECTED_FIELD", justification="The specified fields are filled by remote javascript")
  @DirectMethod
  public TypeWithObjectListField test_JsonArrayInObjectListField( TypeWithObjectListField param ) {
    if( param.i != 33 ) {
      throw new DirectTestFailedException( "We expected 33" );
    }
    
    if( param.obj.length != 2 || !param.obj[0].equals( Double.valueOf(1.0)) || !param.obj[1].equals("anStr") ) {
      throw new DirectTestFailedException( "We expected different values" );
    }
    
    return param;
  }
  public static class TypeWithStringMapField {
    public int i;
    public Map<String,Object> obj;
  }
  
  @edu.umd.cs.findbugs.annotations.SuppressWarnings( value="NP_UNWRITTEN_PUBLIC_OR_PROTECTED_FIELD", justification="The specified fields are filled by remote javascript")
  @DirectMethod
  public TypeWithStringMapField test_JsonArrayInStringMapField( TypeWithStringMapField param ) {
    if( param.i != 33 ) {
      throw new DirectTestFailedException( "We expected 33" );
    }
    
    Map<String,Object> obj = param.obj;
    if( obj.size() != 2 || !obj.get("a").equals( Double.valueOf(1.0)) || !obj.get("b").equals("anStr") ) {
      throw new DirectTestFailedException( "We expected {a:1,b:'anStr'}" );
    }
    
    return param;
  }
}
