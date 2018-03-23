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

package com.softwarementors.djn.spring;

import java.io.Serializable;

import com.softwarementors.extjs.djn.config.annotations.DirectAction;
import com.softwarementors.extjs.djn.config.annotations.DirectMethod;

@DirectAction(action="sessionBean")
public class SpringSessionScopedActionTest implements Serializable {
   
  private static final long serialVersionUID = 7714429562077664025L;

  private int data = 0;
  private int count = 0;

  @DirectMethod
  public void resetSessionData() {
    this.data = 0;
  }
  
  /* Must be synchronized! */
  @DirectMethod
  public synchronized int  test_getSpringSessionData() {
    this.data++;
    int result = this.data;
    
    return result;
  }

  /* Must be synchronized! */
  @DirectMethod
  public synchronized int test_getSpringSessionCallCount() {
    this.count++;
    return this.count;
  }
}
