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

package com.softwarementors.djn.cdi.dispatcher;

import java.util.Set;

import javax.enterprise.context.spi.CreationalContext;
import javax.enterprise.inject.spi.Bean;
import javax.enterprise.inject.spi.BeanManager;
import javax.naming.InitialContext;

import org.apache.log4j.Logger;

import com.softwarementors.extjs.djn.api.RegisteredMethod;
import com.softwarementors.extjs.djn.servlet.ssm.SsmDispatcher;

import edu.umd.cs.findbugs.annotations.NonNull;

public class CdiDispatcher extends SsmDispatcher {
   public BeanManager bm;

   @NonNull
   private static final Logger logger = Logger.getLogger(CdiDispatcher.class);

   @Override
   protected Object getMethodInstance(RegisteredMethod method) throws Exception {
      assert method != null;
      if( this.bm == null ) {
         this.bm = (BeanManager) new InitialContext().lookup("java:comp/env/BeanManager");
      }
      Set<Bean<?>> beans = this.bm.getBeans(method.getActionClass() );

      // Go the CDI route *only* if there is just one candidate bean: else,
      // ignore them all and perform instantiation on our own, providing a warning
      if( beans.size() == 1) {
         Bean<?> bean = beans.iterator().next();
         CreationalContext<?> ctx = this.bm.createCreationalContext(bean);
         Object obj = this.bm.getReference(bean, method.getActionClass(), ctx);
         return obj;
      }
      else if( beans.size() > 1 ) {
         logger.warn( "There were several candidate CDI beans for the DJN action: we will skip them all and perform standard non-CDI instantion");
      }
      return super.getMethodInstance(method);
   }
}