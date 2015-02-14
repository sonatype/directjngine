package com.softwarementors.extjs.djn.test;

import com.softwarementors.extjs.djn.config.annotations.DirectMethod;

/* IMPORTANT
 *
 * NOTE: for generic types, one-to-array conversion is tested in the generic types test battery
 *
*/
public class DeserializationOfSingleItemToSingleItemArrayTest {
  @DirectMethod
  public int test_serverReceivingJsonNumberInIntArrayCreatesSingleItemArray( int[] param ) {
    if( param.length != 1 ) {
      throw new DirectTestFailedException( "We expected a single item array" );
    }
    if( param[0] != 837 ) {
      throw new DirectTestFailedException( "We expected a value of 837 for the first element" );
    }
    return param.length; 
  }
  
  public static class MyClass {
    public int value;
  }
  
  @DirectMethod
  public int test_serverReceivingJsonObjectInArrayCreatesSingleItemArray( MyClass[] param ) {
    if( param.length != 1 ) {
      throw new DirectTestFailedException( "We expected a single item array" );
    }
    if( param[0].value != 43 ) {
      throw new DirectTestFailedException( "We expected a value of 43 for the first element" );
    }
    return param.length;
  }

  @DirectMethod
  public int test_serverReceivingJsonStringInArrayCreatesSingleItemArray( String[] param ) {
    if( param.length != 1 ) {
      throw new DirectTestFailedException( "We expected a single item array" );
    }
    if( !param[0].equals("str") ) {
      throw new DirectTestFailedException( "We expected a value of 'str' for the first element" );
    }
    return param.length; 
  }
  
  @DirectMethod
  public int test_serverReceivingJsonStringInCharArrayCreatesSingleItemArray( char[] param ) {
    if( param.length != 1 ) {
      throw new DirectTestFailedException( "We expected a single item array" );
    }
    if( param[0] != 'c' ) {
      throw new DirectTestFailedException( "We expected a value of 'c' for the first element" );
    }
    return param.length; 
  }
  
}
