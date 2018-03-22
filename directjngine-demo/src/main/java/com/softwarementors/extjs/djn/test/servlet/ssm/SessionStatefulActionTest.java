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

package com.softwarementors.extjs.djn.test.servlet.ssm;

import java.util.Map;

import com.softwarementors.extjs.djn.config.annotations.DirectMethod;
import com.softwarementors.extjs.djn.config.annotations.DirectPollMethod;
import com.softwarementors.extjs.djn.servlet.ssm.ActionScope;
import com.softwarementors.extjs.djn.servlet.ssm.Scope;

@ActionScope(scope=Scope.SESSION)
public class SessionStatefulActionTest {
  private int data = 0;
  private int count = 0;
  private int pollData = 0;

  @DirectMethod
  public void resetSessionData() {
    this.data = 0;
  }
  
  /* Must be synchronized! */
  @DirectMethod
  public synchronized int  test_getSessionData() {
    this.data++;
    int result = this.data;
    
    return result;
  }

  /* Must be synchronized! */
  @DirectMethod
  public synchronized int test_getSessionCallCount() {
    this.count++;
    return this.count;
  }

  /* Must be synchronized! */
  @DirectPollMethod
  public synchronized int test_pollForSessionScopedAction(Map<String,String> parameters) {
    assert parameters != null;
    
    this.pollData++;
    int result = this.pollData;
    
    return result;
  }
}
