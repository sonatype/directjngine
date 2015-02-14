package com.softwarementors.extjs.djn.test;

import java.util.Date;

import com.softwarementors.extjs.djn.config.annotations.DirectMethod;

public class DateHandlingTest {
  @SuppressWarnings("deprecation")
  @DirectMethod
  public Date test_dateHandling( Date date ) {
    Date expected = new Date( 1980-1900, 11, 20, 1, 2, 3);
    long millis = expected.getTime() + 4; // So that we have milliseconds too!
    expected = new Date(millis);
    if( !expected.equals(date)) {
      throw new DirectTestFailedException( "We expected a different value" );
    }
    return date;
  }

  @DirectMethod
  public Date test_nullDateHandling( Date date ) {
    if( date != null ) {
      throw new DirectTestFailedException( "We expected a null value" );
    }
    return date;
  }
  
  @DirectMethod
  public Date test_dateHandlngForWrongJsonType(@SuppressWarnings("unused") Date date ) {
    throw new DirectTestFailedException( "We expected this method never to be called, as it would receive wrong data" );
  }
}
