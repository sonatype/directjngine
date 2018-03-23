/*
 * Copyright © 2012, 2015 Pedro Agulló Soliveres.
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

package com.softwarementors.djn.spring.dispatcher;

import javax.enterprise.inject.spi.BeanManager;
import javax.servlet.ServletContext;

import org.apache.log4j.Logger;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.context.support.WebApplicationContextUtils;

import com.softwarementors.extjs.djn.api.RegisteredMethod;
import com.softwarementors.extjs.djn.servlet.ssm.SsmDispatcher;
import com.softwarementors.extjs.djn.servlet.ssm.WebContextManager;

import edu.umd.cs.findbugs.annotations.NonNull;

public class SpringDispatcher extends SsmDispatcher {
   public BeanManager bm;

   @NonNull
   private static final Logger logger = Logger.getLogger(SpringDispatcher.class);
   
   private WebApplicationContext context;

   public Object private_getMethodInstance(RegisteredMethod method ) throws Exception {
      assert method != null;
      String name;
      
      if( this.context == null ) {
         ServletContext servletContext = WebContextManager.get().getServletContext();
         this.context = WebApplicationContextUtils
               .getRequiredWebApplicationContext(servletContext);
      }
      name = method.getActionName();
      if( this.context.containsBean(name)) {
        Object obj = this.context.getBean(name);
        return obj;
      }
      return null;
   }
   
   @Override
   protected Object getMethodInstance(RegisteredMethod method) throws Exception {
      Object result = private_getMethodInstance(method);
      if( result == null)
        return super.getMethodInstance(method);
      return result;
   }
}