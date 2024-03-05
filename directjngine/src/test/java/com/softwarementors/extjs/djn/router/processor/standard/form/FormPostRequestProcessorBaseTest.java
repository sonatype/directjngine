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
package com.softwarementors.extjs.djn.router.processor.standard.form;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import com.softwarementors.extjs.djn.api.Registry;
import com.softwarementors.extjs.djn.config.GlobalConfiguration;
import com.softwarementors.extjs.djn.gson.DefaultGsonBuilderConfigurator;
import com.softwarementors.extjs.djn.router.dispatcher.Dispatcher;
import org.apache.commons.fileupload2.core.FileItem;
import org.testng.annotations.BeforeTest;
import org.testng.annotations.Test;

import static org.mockito.Mockito.doReturn;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;

public class FormPostRequestProcessorBaseTest
{
  private Registry registry;

  private Dispatcher dispatcher;

  private GlobalConfiguration globalConfiguration;

  private FormPostRequestProcessorBase underTest;

  @BeforeTest
  public void setup() {
    registry = mock(Registry.class);
    dispatcher = mock(Dispatcher.class);
    globalConfiguration = mock(GlobalConfiguration.class);
    doReturn(DefaultGsonBuilderConfigurator.class).when(globalConfiguration).getGsonBuilderConfiguratorClass();

    underTest = new TestFormPostRequestProcessor(registry, dispatcher, globalConfiguration);
  }

  @Test
  public void validateTempFileRemoved() throws IOException {
    Map<String,String> formParameters = new HashMap<String, String>();
    formParameters.put("extAction", "action");
    formParameters.put("extMethod", "method");
    formParameters.put("extType", "type");
    formParameters.put("extTID", "1");
    formParameters.put("extUpload", "true");
    Map<String,FileItem> fileItems = new HashMap<String,FileItem>();
    FileItem fileItem = Util.mockFileItem("field", "avalue");
    fileItems.put("field", fileItem);
    underTest.process(formParameters, fileItems);
    verify(fileItem).delete();
  }

  private static final class TestFormPostRequestProcessor extends FormPostRequestProcessorBase {
    public TestFormPostRequestProcessor(final Registry registry, final Dispatcher dispatcher, final GlobalConfiguration globalConfiguration) {
      super(registry, dispatcher, globalConfiguration);
    }
  }
}
