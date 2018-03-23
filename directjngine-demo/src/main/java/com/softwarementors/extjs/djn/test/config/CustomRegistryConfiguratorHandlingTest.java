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

package com.softwarementors.extjs.djn.test.config;

import java.util.Map;

import com.softwarementors.extjs.djn.test.DirectTestFailedException;

public class CustomRegistryConfiguratorHandlingTest {
  public String test_programmaticMethod( String value ) {
    if( !value.equals( "programmatic")) {
      throw new DirectTestFailedException( "We expected to receive 'programmatic' as value");
    }
    
    return value;
  }
  
  public String test_programmaticPollMethod( Map<String,String> parameters ) {
    assert parameters != null;
    
    if( parameters.size() != 1 || !parameters.containsKey("myParameter") || !parameters.get("myParameter").equals("myValue")) {
      throw new DirectTestFailedException( "We expected to receive 'myParameter' with a value of 'myValue'");
    }
    
    return "ok";
  }
}
