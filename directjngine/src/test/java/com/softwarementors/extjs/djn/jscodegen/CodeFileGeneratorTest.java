package com.softwarementors.extjs.djn.jscodegen;

import org.testng.annotations.Test;

import java.lang.reflect.Method;

import static org.testng.Assert.*;

public class CodeFileGeneratorTest {

    private String getDebugFileName(String file) {
        try {
            Method method = CodeFileGenerator.class.getDeclaredMethod("getDebugFileName", String.class);
            method.setAccessible(true);
            Object result = method.invoke(null, file);
            return (String) result;
        } catch (Exception e) {
            e.printStackTrace();
            return "";
        }
    }

    @Test
    public void getDebugFileNameTest() {
        assertEquals(
                "john.jspiner",
                getDebugFileName("john.jspiner")
        );
        assertEquals(
                "app-debug.js",
                getDebugFileName("app.js")
        );
    }
}