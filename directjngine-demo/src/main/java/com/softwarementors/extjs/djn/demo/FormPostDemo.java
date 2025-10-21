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

import java.io.IOException;
import java.util.Map;

import org.apache.commons.fileupload2.core.FileItem;
import org.apache.commons.io.IOUtils;

import com.softwarementors.extjs.djn.StringBuilderUtils;
import com.softwarementors.extjs.djn.config.annotations.DirectFormPostMethod;

public class FormPostDemo {
  public static class Result {
    public String fileContents = "";
    public String fieldNamesAndValues = "";
    public boolean success;
  }
  
  @DirectFormPostMethod
  public Result djnform_handleSubmit( Map<String, String> formParameters, Map<String, FileItem<?>> fileFields ) throws IOException  {
    assert formParameters != null; 
    assert fileFields != null; 

    Result result = new Result();

    StringBuilder fieldNamesAndValues = new StringBuilder("<p>Non file fields:</p>");
    for( Map.Entry<String,String> entry : formParameters.entrySet()) {
      String fieldName = entry.getKey();
      String value = entry.getValue();
      StringBuilderUtils.appendAll( fieldNamesAndValues, "<b>", fieldName, "</b>='",
          value, "'<br>" );
    }
    
    fieldNamesAndValues.append( "<p></p><p>FILE fields:</p>" );
    for( Map.Entry<String,FileItem<?>> entry : fileFields.entrySet() ) {
      String fieldName = entry.getKey();
      FileItem<?> fileItem = entry.getValue();
      result.fileContents = IOUtils.toString( fileItem.getInputStream() );
      fileItem.getInputStream().close();
      StringBuilderUtils.appendAll( fieldNamesAndValues, "<b>", fieldName, "</b>:" );
      
      boolean fileChosen = !fileItem.getName().equals(""); 
      if( fileChosen ) {
        StringBuilderUtils.appendAll( fieldNamesAndValues, " file=", fileItem.getName(),
            " (size=", Long.toString(fileItem.getSize()), ")" );
      }
      else {
        fieldNamesAndValues.append(" --no file was chosen--" );        
      }
    }
    
    result.fieldNamesAndValues = fieldNamesAndValues.toString();
    result.success = true;
    return result;
  }

}
