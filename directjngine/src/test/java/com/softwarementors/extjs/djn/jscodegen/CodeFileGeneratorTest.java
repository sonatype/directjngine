package com.softwarementors.extjs.djn.jscodegen;

import org.testng.annotations.Test;

import static org.testng.Assert.assertEquals;

public class CodeFileGeneratorTest {

    @Test
    public void getDebugFileNameTest() {
        assertEquals(
                "john.jspiner",
                CodeFileGenerator.getDebugFileName("john.jspiner")
        );
        assertEquals(
                "app-debug.js",
                CodeFileGenerator.getDebugFileName("app.js")
        );
    }
}