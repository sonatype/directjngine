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
 * GNU Lesser Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with DirectJNgine.  If not, see <http://www.gnu.org/licenses/>.
 * 
 * This software uses the ExtJs library (http://extjs.com), which is 
 * distributed under the GPL v3 license (see http://extjs.com/license).
 */

package com.softwarementors.extjs.djn.demo;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import com.softwarementors.extjs.djn.config.annotations.DirectMethod;
import com.softwarementors.extjs.djn.servlet.ssm.ActionScope;
import com.softwarementors.extjs.djn.servlet.ssm.Scope;
@ActionScope(scope=Scope.APPLICATION)
public class DirectStoreDemo {

  private static class Experience {
    @SuppressWarnings("unused")
    public String startDate;
    @SuppressWarnings("unused")
    public String endDate;
    @SuppressWarnings("unused")
    public String description;
    
    private Experience( String startDate, String endDate, String description ) {
      this.startDate = startDate;
      this.endDate = endDate;
      this.description = description;
    }
  }

  @DirectMethod
  public List<Experience> djn_loadExperienceData() {
    List<Experience> items = new ArrayList<Experience>();
    Collections.addAll( items,
      new Experience( "1990", "", "Programming, design and analysis in many projects, using Java, C#, C++, Smalltalk, Delphi, C"),
      new Experience( "1992", "1994", "Develop Object Oriented Databases"),
      new Experience( "1994", "", "More than 80 <b>articles published</b> in Delphi Magazine, Solo Programadores, Programacion Actual, etc."),
      new Experience( "1997", "",  "<b>Leading Developer and Architect</b> in many projects"),
      new Experience( "2001", "2004", "<b>Team leader</b> of a team development a multidimensional database product"),
      new Experience( "2002", "2003",  "Development of an <b>ADO.NET driver</b> in C# for a multidimensional database (HiSpins)"),
      new Experience( "2003", "", "Consulting in <b>Agile Programming</b> and <b>TDD</b>"),
      new Experience( "2006", "", "Creation and direction of an <b>Agile Development Team</b>"),
      new Experience( "2007", "", "Implementation of <b>BzNgine</b>, a framework for TDD of business classes, JPA based (Proprietary)"),
      new Experience( "2009", "", "Implementation of proof of concept for a framework based on Wicket, <b>WiNgine</b> (Proprietary)"),
      new Experience( "2009", "", "Implementation of <b>DirectJNgine</b> for ExtJs (OpenSource)"),
      new Experience( "", "", "...other projects and skills")
    );
    
    return items;
  }
}
