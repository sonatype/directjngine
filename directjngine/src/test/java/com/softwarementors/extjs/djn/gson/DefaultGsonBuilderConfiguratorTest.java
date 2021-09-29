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
package com.softwarementors.extjs.djn.gson;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonObject;
import com.softwarementors.extjs.djn.config.GlobalConfiguration;
import com.softwarementors.extjs.djn.router.processor.poll.PollErrorResponseData;
import org.testng.annotations.BeforeTest;
import org.testng.annotations.Test;

import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.mockito.Mockito.mock;

public class DefaultGsonBuilderConfiguratorTest
{
  private DefaultGsonBuilderConfigurator underTest;

  private Gson gson;

  @BeforeTest
  public void setup() {
    underTest = new DefaultGsonBuilderConfigurator();
    GsonBuilder gsonBuilder = new GsonBuilder();
    GlobalConfiguration globalConfiguration = mock(GlobalConfiguration.class);
    underTest.configure(gsonBuilder, globalConfiguration);
    gson = gsonBuilder.create();
  }

  @Test
  public void testPollErrorResponseDataSerializer() {
    PollErrorResponseData pollErrorResponseData = new PollErrorResponseData(new RuntimeException("uhoh"), false);
    String jsonString = gson.toJson(pollErrorResponseData);
    assertThat(jsonString, is("{\"message\":\"RuntimeException* uhoh\",\"where\":\"\",\"serverException\":{\"rootException\":{\"type\":\"java*lang*RuntimeException\",\"message\":\"uhoh\",\"where\":\"\"},\"exception\":{\"type\":\"java*lang*RuntimeException\",\"message\":\"uhoh\",\"where\":\"\"},\"exceptions\":[{\"type\":\"java*lang*RuntimeException\",\"message\":\"uhoh\",\"where\":\"\"}]}}"));
  }
}
