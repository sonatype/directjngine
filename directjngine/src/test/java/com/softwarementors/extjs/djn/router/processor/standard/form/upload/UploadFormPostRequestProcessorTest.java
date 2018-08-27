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
package com.softwarementors.extjs.djn.router.processor.standard.form.upload;

import java.io.StringWriter;
import java.util.ArrayList;
import java.util.List;

import com.softwarementors.extjs.djn.api.Registry;
import com.softwarementors.extjs.djn.config.GlobalConfiguration;
import com.softwarementors.extjs.djn.gson.DefaultGsonBuilderConfigurator;
import com.softwarementors.extjs.djn.router.dispatcher.Dispatcher;
import org.apache.commons.fileupload.FileItem;
import org.testng.annotations.BeforeTest;
import org.testng.annotations.Test;

import static org.hamcrest.CoreMatchers.containsString;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.core.IsNot.not;
import static org.mockito.Mockito.doReturn;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

public class UploadFormPostRequestProcessorTest
{
  private UploadFormPostRequestProcessor underTest;

  private Registry registry;

  private Dispatcher dispatcher;

  private GlobalConfiguration globalConfiguration;

  @BeforeTest
  public void setup() {
    registry = mock(Registry.class);
    dispatcher = mock(Dispatcher.class);
    globalConfiguration = mock(GlobalConfiguration.class);
    doReturn(DefaultGsonBuilderConfigurator.class).when(globalConfiguration).getGsonBuilderConfiguratorClass();

    underTest = new UploadFormPostRequestProcessor(registry, dispatcher, globalConfiguration);
  }

  @Test
  public void validateResultEncoded() throws Exception {
    List fileItems = new ArrayList();
    fileItems.add(mockFileItem("extAction", "</textarea><script>alert(2)</script>y8jn8"));
    fileItems.add(mockFileItem("extMethod", "</textarea><script>alert(2)</script>y8jn8"));
    fileItems.add(mockFileItem("extType", "rpc"));
    fileItems.add(mockFileItem("extTID", "17"));
    fileItems.add(mockFileItem("extUpload", "true"));

    StringWriter writer = new StringWriter();
    underTest.process(fileItems, writer);

    assertThat(writer.toString(), containsString("&lt;/textarea&gt;&lt;script&gt;alert(2)&lt;/script&gt;y8jn8"));
    assertThat(writer.toString(), not(containsString("</textarea><script>alert(2)</script>y8jn8")));
  }

  private FileItem mockFileItem(String name, String value) {
    FileItem fileItem = mock(FileItem.class);
    when(fileItem.isFormField()).thenReturn(true);
    when(fileItem.getFieldName()).thenReturn(name);
    when(fileItem.getString()).thenReturn(value);
    return fileItem;
  }
}
