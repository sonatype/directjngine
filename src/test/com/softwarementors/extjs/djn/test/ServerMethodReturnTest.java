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

package com.softwarementors.extjs.djn.test;

import java.util.HashMap;
import java.util.Map;

import com.softwarementors.extjs.djn.config.annotations.DirectMethod;
import com.softwarementors.extjs.djn.test.helper.ComplexObject;
import com.softwarementors.extjs.djn.test.helper.VeryComplexObject;

public class ServerMethodReturnTest {

  public ServerMethodReturnTest() {
    // Do nothing
  }
  
  @DirectMethod
  public String test_chineseStringsWorkCorrectly(String text) {
    assert text != null;
    
    // ***** VERY IMPORTANT ******
    // You MUST save this Java file with UTF-8 encoding, AND call the Java compiler
    // with '-encoding utf8', or else use encoded unicode characters to avoid problems
    // in how '界世界' is handled 
    // 界世界 = \u754C\u4E16\u754C
    if( !text.equals( "界世界") ) {
      throw new DirectTestFailedException( "We expected to receive '界世界', but we received '" + text + "'. Thist might be due to problems with UTF-8: make sure your HTML file uses UTF-8" );
    }
    
    // 世界 = \u4E16\u754C
    return "世界";
  }
  
  @DirectMethod
  public void djn_test_serverReturningNothing() {
    // Do nothing
  }
  
  @DirectMethod
  public String djn_test_serverReturningNull() {    
    return null;
  }

  @DirectMethod
  public byte djn_test_serverReturningByte() {
    return Byte.MAX_VALUE;
  }
  
  @DirectMethod
  public Byte djn_test_serverReturningByteObject() {
    return Byte.valueOf(Byte.MIN_VALUE);
  }  
  
  @DirectMethod
  public short djn_test_serverReturningShort() {
    return Short.MAX_VALUE;
  }
  
  @DirectMethod
  public Short djn_test_serverReturningShortObject() {
    return Short.valueOf(Short.MIN_VALUE);
  }
  
  @DirectMethod
  public byte djn_test_serverReturningChar() {
    return 'B';
  }
  
  @DirectMethod
  public Character djn_test_serverReturningCharacterObject() {
    return Character.valueOf('b');
  }  
    
  @DirectMethod
  public int djn_test_serverReturningInt() {
    int result = Integer.MAX_VALUE;
    return result;
  }

  @DirectMethod
  public Integer djn_test_serverReturningIntegerObject() {
    return Integer.valueOf(Integer.MIN_VALUE);
  }
  
  @DirectMethod
  public long djn_test_serverReturningLong() {
    long result = Long.MAX_VALUE;
    return result;
  }

  @DirectMethod
  public Long djn_test_serverReturningLongObject() {
    return Long.valueOf(Long.MIN_VALUE);
  }
  
  @DirectMethod
  public float djn_test_serverReturningFloat() {
    return Float.MAX_VALUE;
  }

  @DirectMethod
  public Float djn_test_serverReturningFloatObject() {
    return Float.valueOf(Float.MIN_VALUE);
  }
  
  @DirectMethod
  public double djn_test_serverReturningDouble() {
    return Double.MAX_VALUE;
  }

  @DirectMethod
  public Double djn_test_serverReturningDoubleObject() {
    return Double.valueOf(Double.MIN_VALUE);
  }

  @DirectMethod
  public String djn_test_serverReturningString() {
    return "abC";
  }

  @DirectMethod
  public String djn_test_serverReturningEmptyString() {
    return "";
  }

  @DirectMethod
  public VeryComplexObject djn_test_serverReturningVeryComplexObject() {
    ComplexObject myComplexObject = new ComplexObject();
    myComplexObject.name = "MyPet";
    ComplexObject[] moreComplexObjects = new ComplexObject[2];
    moreComplexObjects[0] = null;
    moreComplexObjects[1] = new ComplexObject();
    moreComplexObjects[1].age = 5;
    VeryComplexObject result = new VeryComplexObject();
    
    result.ints = new Integer[] { Integer.valueOf(33), null };
    result.myComplexObject = myComplexObject;
    result.moreComplexObjects = moreComplexObjects;
    
    return result;
  }
  
  @DirectMethod
  public double[] djn_test_serverReturningPrimitiveDoubleArray( double value, int count) {
    double[] result = new double[count];
    for( int i = 0; i < count; i++) {
      result[i] = value;
    }
    
    return result;
  }

  @DirectMethod
  public Map<String,String> djn_test_serverReturningMap() {
    Map<String,String> result = new HashMap<String,String>();
    result.put( "key1", "value1");
    result.put( "key2", null );
    return result;
  }
  
  public static class Base {
    public String v1;
    
    public Base( String v1) {
      this.v1 = v1;
    }
  }
  
  public static class Derived extends Base {
    public int v2;
    
    public Derived( String v1, int v2 ) {
      super(v1);
      this.v2 = v2;
    }
  }

  @DirectMethod
  public Base[] test_serverReturningPolymorphicValues() {
    Base[] result = new Base[2];
    result[0] = new Base("a");
    result[1] = new Derived("b", 5);
    return result;
  }

}
