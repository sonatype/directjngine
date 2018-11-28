/*
 * Copyright 2018-present Sonatype, Inc.
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
package com.softwarementors.extjs.djn.servlet;

import javax.servlet.http.HttpServletRequest;

import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;
import static org.testng.Assert.assertEquals;

import com.softwarementors.extjs.djn.router.RequestType;
import org.testng.annotations.BeforeTest;
import org.testng.annotations.Test;

public class DirectJNgineServletTest
{
  private static final String MULTIPART = "multipart/";

  private HttpServletRequest request;
  
  @BeforeTest
  public void setup() {
    request = mock(HttpServletRequest.class);
    
    when(request.getPathInfo()).thenReturn("path");
  }
  
  @Test
  public void getFromRequestContentTypeReturnFormUploadWhenMultipartPut() {
    when(request.getContentType()).thenReturn("multipart/");
    when(request.getMethod()).thenReturn("PUT");
    
    RequestType type = DirectJNgineServlet.getFromRequestContentType(request);

    assertEquals(type, RequestType.FORM_UPLOAD_POST);
  }

  @Test
  public void getFromRequestContentTypeReturnFormUploadWhenMultipartPost() {
    when(request.getContentType()).thenReturn(MULTIPART);
    when(request.getMethod()).thenReturn("POST");

    RequestType type = DirectJNgineServlet.getFromRequestContentType(request);

    assertEquals(type, RequestType.FORM_UPLOAD_POST);
  }
}
