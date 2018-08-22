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
package com.softwarementors.extjs.djn.router.processor;

import org.testng.annotations.Test;

import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.MatcherAssert.assertThat;

public class RequestExceptionTest
{
  @Test
  public void forJsonElementMustBeAJsonArray_isEncoded() {
    RequestException e = RequestException.forJsonElementMustBeAJsonArray("bleh", "notjson <i onclick=\"alert('haha')\">");
    assertThat(e.getMessage(), is("The method arguments must be a json array, but it is not. Json=notjson &lt;i onclick=&quot;alert('haha')&quot;&gt;"));
  }

  @Test
  public void forActionNotFound_isEncoded() {
    RequestException e = RequestException.forActionNotFound("<i onclick=\"alert('haha')\">");
    assertThat(e.getMessage(), is("No action registered as '&lt;i onclick=&quot;alert('haha')&quot;&gt;'"));
  }

  @Test
  public void forActionMethodNotFound_isEncoded() {
    RequestException e = RequestException.forActionMethodNotFound("<i onclick=\"alert('haha')\">", "<i onclick=\"alert('haha')\">");
    assertThat(e.getMessage(), is("No method registered as '&lt;i onclick=&quot;alert('haha')&quot;&gt;' in action '&lt;i onclick=&quot;alert('haha')&quot;&gt;'"));
  }

  @Test
  public void forJsonElementMustBeANonNullOrEmptyValue_isEncoded() {
    RequestException e = RequestException.forJsonElementMustBeANonNullOrEmptyValue("<i onclick=\"alert('haha')\">", RequestExceptionTest.class);
    assertThat(e.getMessage(), is("The json '<i onclick=\"alert('haha')\">' element is missing, null or emtpy, or it is not of type com.softwarementors.extjs.djn.router.processor.RequestExceptionTest."));
  }

  @Test
  public void forJsonElementMissing_isEncoded() {
    RequestException e = RequestException.forJsonElementMissing("<i onclick=\"alert('haha')\">");
    assertThat(e.getMessage(), is("The json '<i onclick=\"alert('haha')\">' element is missing."));
  }

  @Test
  public void forPollEventNotFound_isEncoded() {
    RequestException e = RequestException.forPollEventNotFound("<i onclick=\"alert('haha')\">");
    assertThat(e.getMessage(), is("No method registered for poll event '&lt;i onclick=&quot;alert('haha')&quot;&gt;'"));
  }

  @Test
  public void forSourceNotFound_isEncoded() {
    RequestException e = RequestException.forSourceNotFound("<i onclick=\"alert('haha')\">");
    assertThat(e.getMessage(), is("Unable to find source for '&lt;i onclick=&quot;alert('haha')&quot;&gt;'"));
  }
}
