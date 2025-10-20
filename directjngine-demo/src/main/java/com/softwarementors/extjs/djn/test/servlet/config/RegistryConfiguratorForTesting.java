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

package com.softwarementors.extjs.djn.test.servlet.config;

import java.lang.reflect.Method;
import java.util.Map;

import jakarta.servlet.ServletConfig;

import com.softwarementors.extjs.djn.StringUtils;
import com.softwarementors.extjs.djn.api.RegisteredAction;
import com.softwarementors.extjs.djn.api.RegisteredApi;
import com.softwarementors.extjs.djn.api.Registry;
import com.softwarementors.extjs.djn.servlet.ServletRegistryConfigurator;
import com.softwarementors.extjs.djn.test.config.CustomRegistryConfiguratorHandlingTest;

public class RegistryConfiguratorForTesting implements ServletRegistryConfigurator {

  private static Method getMethod( Class<?> cls, String name, Class<?> parameterTypes) {
    assert cls != null;
    assert !StringUtils.isEmpty(name);

    try {
      Method m = cls.getMethod(name, parameterTypes);
      return m;
    }
    catch (SecurityException e) {
      // Do not do this in production quality code!
      throw new RuntimeException(e);
    }
    catch (NoSuchMethodException e) {
      // Do not do this in production quality code!
      throw new RuntimeException(e);
    }
  }
  
  public void configure(Registry registry, ServletConfig config) {
    assert registry != null;
    assert config != null;
    
    createApiProgrammatically(registry, config);    
  }

  private static void createApiProgrammatically(Registry registry, ServletConfig config) {
    // Create a new api programmatically
    String apiFile = config.getServletContext().getRealPath("test/ProgrammaticApi.js");
    RegisteredApi api = registry.addApi( "programmaticApi", "test/ProgrammaticApi.js", apiFile, "Djn.programmaticNamespace", "Djn.programmaticNamespace" );
    
    // Register a new action with a method
    RegisteredAction action = api.addAction( CustomRegistryConfiguratorHandlingTest.class, "MyCustomRegistryConfiguratorHandlingTest");
    Method m = getMethod( CustomRegistryConfiguratorHandlingTest.class, "test_programmaticMethod", String.class);
    action.addStandardMethod( "myProgrammaticMethod", m, false); 
    
    // Register a poll method
    Method pm = getMethod( CustomRegistryConfiguratorHandlingTest.class, "test_programmaticPollMethod", Map.class);
    action.addPollMethod( "myProgrammaticPollMethod", pm);
  }

}
