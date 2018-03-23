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

package com.softwarementors.extjs.djn.router.processor.standard.json;

import com.google.gson.JsonArray;
import com.softwarementors.extjs.djn.router.TransferType;
import com.softwarementors.extjs.djn.router.processor.standard.StandardRequestData;

import edu.umd.cs.findbugs.annotations.NonNull;

public class JsonRequestData extends StandardRequestData {
  
  public static final String ACTION_ELEMENT = "action";
  public static final String METHOD_ELEMENT = "method";
  public static final String TID_ELEMENT = "tid";
  public static final String TYPE_ELEMENT = "type";
  public static final String DATA_ELEMENT = "data";
  // @todo:metadata
  // public static final String METADATA_ELEMENT = "metadata";
  
  @NonNull private JsonArray jsonData;
  // @todo:metadata
  // @NonNull private JsonArray jsonMetadata;
  
  /* package */ JsonRequestData(@NonNull String type, String action, String method, Long tid, JsonArray jsonData /* @todo:metadata, JsonArray jsonMetadata*/ ) {
    super( type, action, method, tid );

    assert type.equals(TransferType.RPC);
    this.jsonData = jsonData;
    // @todo:metadata
    // this.jsonMetadata = jsonMetadata;
  }

  /* package */ public JsonArray getJsonData() {
    return this.jsonData;
  }
 
}
