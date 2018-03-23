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

package com.softwarementors.extjs.djn.test.servlet.ssm;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpSession;

import com.softwarementors.extjs.djn.config.annotations.DirectMethod;
import com.softwarementors.extjs.djn.servlet.ssm.WebContext;
import com.softwarementors.extjs.djn.servlet.ssm.WebContextManager;

public class WebContextManagerTest {
  public static class WebContextInfo {
    public int callsInSession = 0;
    public int callsInApplication = 0;
    public String sessionId;
  }
  
  @DirectMethod
  public WebContextInfo test_webContext() {
    assert WebContextManager.isWebContextAttachedToCurrentThread();
    
    WebContext context = WebContextManager.get();
    HttpSession session = context.getSession();
    ServletContext application = context.getServletContext();
    
    // Keep a counter of how many times we have called this method in this session
    Integer callsInSession = (Integer)session.getAttribute("callsInSession");
    if( callsInSession == null ) {
      callsInSession = Integer.valueOf(0);
    }
    callsInSession = Integer.valueOf(callsInSession.intValue() + 1);
    session.setAttribute("callsInSession", callsInSession);

    // Keep a counter of how many times we have called this method in this application
    Integer callsInApplication = (Integer)application.getAttribute("callsInApplication");
    if( callsInApplication == null ) {
      callsInApplication = Integer.valueOf(0);
    }
    callsInApplication = Integer.valueOf(callsInApplication.intValue() + 1);
    application.setAttribute("callsInApplication", callsInApplication);
    
    // Return status information
    WebContextInfo result = new WebContextInfo();
    result.callsInApplication = callsInApplication.intValue();
    result.callsInSession = callsInSession.intValue();
    result.sessionId = context.getSession().getId();
    return result;
  }
}
