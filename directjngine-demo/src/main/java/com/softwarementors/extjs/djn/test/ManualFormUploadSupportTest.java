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

package com.softwarementors.extjs.djn.test;

import java.io.IOException;
import java.util.Map;

import org.apache.commons.fileupload2.core.FileItem;
import org.apache.commons.io.IOUtils;

import com.softwarementors.extjs.djn.config.annotations.DirectFormPostMethod;

// Unfortunately, there is no way to automate file uploads because
// there is no way we can assign the file to upload programmatically,
// for security reason. Therefore, these methods must be executed manually,
// by navigating to ManualTests.html 
public class ManualFormUploadSupportTest {

  public static class Result {
    public String file1Field;
    public String file1Name;
    public String file1Text = "--no file--";
    public String file2Field;
    public String file2Name;
    public String file2Text = "--no file--";
    public boolean success = true;
  }
  
  @DirectFormPostMethod
  public Result djnform_test_sendFilesManually( Map<String, String> formParameters, Map<String, FileItem> fileFields )  {
    assert formParameters != null;
    assert fileFields != null;

    Result r = new Result();
    FileItem file1 = fileFields.get( "fileUpload1");
    FileItem file2 = fileFields.get( "fileUpload2");
    if( fileFields.size() != 2 || file1 == null || file2 == null ) {
      throw new DirectTestFailedException( "Unexpected error receiving file fields");
    }
    
    try {
      r.file1Field = file1.getFieldName();
      r.file1Name = file1.getName();
      if( !r.file1Name.equals("")) {
        r.file1Text = IOUtils.toString( file1.getInputStream() );
        file1.getInputStream().close();
      }

      r.file2Field = file2.getFieldName();
      r.file2Name = file2.getName();
      if( !r.file2Name.equals("")) {
        r.file2Text = IOUtils.toString( file2.getInputStream() );
        file2.getInputStream().close();
      }
    }
    catch( IOException e ) {
      throw new DirectTestFailedException( "Test failed", e );
    }
    
    return r;
  }

  public static class SimulatedServerError extends RuntimeException {
    private static final long serialVersionUID = 2036271699517148114L;

    public SimulatedServerError( String message ) {
      super(message);
    }
  }

/*  
  @DirectFormPostMethod
  public void djnform_test_simulateServerError( Map<String, String> formParameters, Map<String, FileItem> fileFields )  {
    assert formParameters != null;
    assert fileFields != null; 
    
   
    throw new SimulatedServerError( "We are simulating an unexpected server error for you to see how to handle it!");
  }
*/  
}
