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

import java.util.Map;

import org.apache.commons.fileupload.FileItem;

import com.softwarementors.extjs.djn.config.annotations.DirectFormPostMethod;

public class FormTest {

  public OkResult djnform_test_formPostForNonAnnotatedMethod( Map<String, String> formParameters, Map<String, FileItem> fileFields )  {
    assert formParameters != null;
    assert fileFields != null;

    return new OkResult("ok");
  }

  public static class OkResult {
    public OkResult( String message ) {
      this.message = message;
    }
    
    public String message;
    public boolean success = true; 
  }
  
  @DirectFormPostMethod
  public OkResult djnform_test_handleForm( Map<String, String> formParameters, Map<String, FileItem> fileFields )  {
    assert formParameters != null;
    assert fileFields != null;

    String input1Value = formParameters.get( "input1");    
    String input2Value = formParameters.get( "input2");    
    if( formParameters.size() != 2 || !input1Value.equals("value=&1") || !input2Value.equals("") ) {
      throw new DirectTestFailedException( "Unexpected error receiving parameters");
    }
    
    return new OkResult(input1Value);
  }

  @DirectFormPostMethod
  public OkResult test_handleFormWithBaseParams( Map<String, String> formParameters, Map<String, FileItem> fileFields )  {
    assert formParameters != null;
    assert fileFields != null;

    String input1Value = formParameters.get( "input1");    
    String input2Value = formParameters.get( "input2");    
    String baseParam = formParameters.get( "baseParam");    
    if( formParameters.size() != 3 || !input1Value.equals("value=&1") || !input2Value.equals("") || !baseParam.equals("5") ) {
      throw new DirectTestFailedException( "Unexpected error receiving parameters");
    }
    
    return new OkResult(baseParam);
  }

  @DirectFormPostMethod
  @edu.umd.cs.findbugs.annotations.SuppressWarnings( value="SIC_INNER_SHOULD_BE_STATIC_ANON", 
    justification="MyServerException is never used outside of this method: making it an static inner class will obscure that")
  public OkResult djnform_test_handleFormCausingServerException( Map<String, String> formParameters, Map<String, FileItem> fileFields ) {
    assert formParameters != null;
    assert fileFields != null;

    class MyServerException extends RuntimeException {
      private static final long serialVersionUID = -7373417034294829871L; /* Do nothing */ 
    }
    
    throw new MyServerException(); 
  }
  
/*  
  @DirectFormPostMethod
  public int test_handleFormWithMultivaluedItem( Map<String, String> formParameters, Map<String, FileItem> fileFields )  {
    assert formParameters != null;
    assert fileFields != null;

    if( !RequestProcessorUtils.isMultiValued(formParameters, "multivalues")) {
      throw new DirectTestFailedException( "The 'multivalues' parameters should have several values");
    }
    List<String> values = RequestProcessorUtils.getValues(formParameters, "multivalues");
    if( values.size() != 3) {
      throw new DirectTestFailedException( "The 'multivalues' parameters should have 3 values");
    }
    if( !values.contains("A")) {
      throw new DirectTestFailedException( "The 'multivalues' parameters should have a 'A' value");
    }
    if( !values.contains("C")) {
      throw new DirectTestFailedException( "The 'multivalues' parameters should have a 'C' value");
    }
    if( !values.contains("E")) {
      throw new DirectTestFailedException( "The 'multivalues' parameters should have a 'E' value");
    }
    return values.size();
  }
*/
}
