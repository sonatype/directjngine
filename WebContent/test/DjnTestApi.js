/**********************************************************************
 * 
 * Code generated automatically by DirectJNgine
 * Copyright (c) 2009, Pedro Agulló Soliveres
 * 
 * DO NOT MODIFY MANUALLY!!
 * 
 **********************************************************************/

Ext.namespace( 'Djn.apiNamespace');
Ext.namespace( 'Djn.actionsNamespace');

Djn.apiNamespace.PROVIDER_BASE_URL=window.location.protocol + '//' + window.location.host + '/' + (window.location.pathname.split('/').length>2 ? window.location.pathname.split('/')[1]+ '/' : '')  + 'djn/directprovider';

Djn.apiNamespace.POLLING_URLS = {
}

Djn.apiNamespace.REMOTING_API = {
  url: Djn.apiNamespace.PROVIDER_BASE_URL,
  type: 'remoting',
  namespace: Djn.actionsNamespace,
  actions: {
    NamespaceTest: [
      {
        name: 'test_namespacedAction'/*() => boolean */,
        len: 0,
        formHandler: false
      }
    ]
  }
}

/**********************************************************************
 * 
 * Code generated automatically by DirectJNgine
 * Copyright (c) 2009, Pedro Agulló Soliveres
 * 
 * DO NOT MODIFY MANUALLY!!
 * 
 **********************************************************************/

Ext.namespace( 'Djn.test');

Djn.test.PROVIDER_BASE_URL=window.location.protocol + '//' + window.location.host + '/' + (window.location.pathname.split('/').length>2 ? window.location.pathname.split('/')[1]+ '/' : '')  + 'djn/directprovider';

Djn.test.POLLING_URLS = {
  test_pollForSessionScopedAction : Djn.test.PROVIDER_BASE_URL + '/poll/test_pollForSessionScopedAction' /* () => int -- calls com.softwarementors.extjs.djn.test.servlet.ssm.SessionStatefulActionTest.test_pollForSessionScopedAction */, 
  test_pollForApplicationScopedAction : Djn.test.PROVIDER_BASE_URL + '/poll/test_pollForApplicationScopedAction' /* () => int -- calls com.softwarementors.extjs.djn.test.servlet.ssm.ApplicationStatefulActionTest.test_pollForApplicationScopedAction */, 
  test_pollCausingServerError : Djn.test.PROVIDER_BASE_URL + '/poll/test_pollCausingServerError' /* () => String -- calls com.softwarementors.extjs.djn.test.PollTest.djnpoll_test_pollCausingServerError */, 
  test_pollWithNoBaseParams : Djn.test.PROVIDER_BASE_URL + '/poll/test_pollWithNoBaseParams' /* () => String -- calls com.softwarementors.extjs.djn.test.PollTest.djnpoll_test_pollWithNoBaseParams */, 
  test_pollForNonAnnotatedMethod : Djn.test.PROVIDER_BASE_URL + '/poll/test_pollForNonAnnotatedMethod' /* () => String -- calls com.softwarementors.extjs.djn.test.PollTest.djnpoll_test_pollForNonAnnotatedMethod */, 
  test_pollWithBaseParams : Djn.test.PROVIDER_BASE_URL + '/poll/test_pollWithBaseParams' /* () => String -- calls com.softwarementors.extjs.djn.test.PollTest.djnpoll_test_pollWithBaseParams */
}

Djn.test.REMOTING_API = {
  url: Djn.test.PROVIDER_BASE_URL,
  type: 'remoting',
  actions: {
    ServerMethodParametersReceptionTest: [
      {
        name: 'test_serverMethodWithJsonArrayParameterReceivingMultipleParameters'/*(com.google.gson.JsonArray) => int */,
        len: 1,
        formHandler: false
      },
      {
        name: 'test_serverReceivingCharFromNumberTooBig'/*(Character) => char */,
        len: 1,
        formHandler: false
      },
      {
        name: 'test_serverReceivingJsonArrayEmptyInStringArray'/*(String[]) => boolean */,
        len: 1,
        formHandler: false
      },
      {
        name: 'test_serverReceivingJsonStringWithSpecialCharacters'/*(String) => String */,
        len: 1,
        formHandler: false
      },
      {
        name: 'test_serverReceivingByteFromANumberTooBig'/*(Byte) => byte */,
        len: 1,
        formHandler: false
      },
      {
        name: 'test_serverReceivingNullForAPrimitive'/*(int) => boolean */,
        len: 1,
        formHandler: false
      },
      {
        name: 'test_serverReceivingJsonStringInBigDecimal'/*(java.math.BigDecimal) => boolean */,
        len: 1,
        formHandler: false
      },
      {
        name: 'test_serverReceivingJsonArrayNullInPrimitiveArray'/*(int[]) => boolean */,
        len: 1,
        formHandler: false
      },
      {
        name: 'test_serverReceivingJsonArrayOfPrimitiveInPrimitiveArray'/*(int[]) => boolean */,
        len: 1,
        formHandler: false
      },
      {
        name: 'test_serverReceivingNullValueForAValueInAPrimitiveArrayArgument'/*(int[]) => boolean */,
        len: 1,
        formHandler: false
      },
      {
        name: 'test_serverReceivingJsonArrayInArrayHavingAnUndefinedValue'/*(String[]) => boolean */,
        len: 1,
        formHandler: false
      },
      {
        name: 'test_serverReceivingOneElementIntArrayInIntPrimitive'/*(int) => boolean */,
        len: 1,
        formHandler: false
      },
      {
        name: 'test_privateStaticMethodCall'/*() => boolean */,
        len: 0,
        formHandler: false
      },
      {
        name: 'test_serverReceivingLessParametersThanExpected'/*(int, String, int) => int */,
        len: 3,
        formHandler: false
      },
      {
        name: 'test_serverReceivingOneParameter'/*(int) => int */,
        len: 1,
        formHandler: false
      },
      {
        name: 'test_serverReceivingJsonStringWithEscapedCharacters'/*(String) => String */,
        len: 1,
        formHandler: false
      },
      {
        name: 'test_serverReceivingStringRepresentingValidIntInIntPrimitive'/*(int) => boolean */,
        len: 1,
        formHandler: false
      },
      {
        name: 'test_serverReceivingJsonArrayOfObjectsInTypedArray'/*(com.softwarementors.extjs.djn.test.helper.ComplexObject[]) => com.softwarementors.extjs.djn.test.helper.ComplexObject[] */,
        len: 1,
        formHandler: false
      },
      {
        name: 'test_serverReceivingJsonNumberInBigInteger'/*(java.math.BigInteger) => boolean */,
        len: 1,
        formHandler: false
      },
      {
        name: 'test_serverMethodWithJsonArrayParameterReceivingOneParameter'/*(com.google.gson.JsonArray) => boolean */,
        len: 1,
        formHandler: false
      },
      {
        name: 'test_serverReceivingSeveralParametersOneOfThemNull'/*(String, String, String) => String */,
        len: 3,
        formHandler: false
      },
      {
        name: 'test_serverReceivingByteFromANumberTooSmall'/*(byte) => Byte */,
        len: 1,
        formHandler: false
      },
      {
        name: 'test_serverReceivingJsonNumberInValidCharRangeInCharObject'/*(Character) => char */,
        len: 1,
        formHandler: false
      },
      {
        name: 'test_serverReceivingMoreParametersThanExpected'/*(int) => int */,
        len: 1,
        formHandler: false
      },
      {
        name: 'test_serverReceivingParametersWithObjectHavingArrayWithUndefinedValue'/*(String) => boolean */,
        len: 1,
        formHandler: false
      },
      {
        name: 'test_serverProblematicLongString2'/*(String, String, int, int, String) => String */,
        len: 5,
        formHandler: false
      },
      {
        name: 'test_serverReceivingJsonArrayInArrayHavingANullValue'/*(String[]) => boolean */,
        len: 1,
        formHandler: false
      },
      {
        name: 'test_serverReceivingJsonArrayInArray'/*(String[]) => boolean */,
        len: 1,
        formHandler: false
      },
      {
        name: 'test_serverReceivingUniqueParameterNull'/*(String) => String */,
        len: 1,
        formHandler: false
      },
      {
        name: 'test_serverReceivingJsonStringWithNewLineCharacters'/*(String) => String */,
        len: 1,
        formHandler: false
      },
      {
        name: 'test_serverRecevingLongStringParameters'/*(String, String) => String */,
        len: 2,
        formHandler: false
      },
      {
        name: 'test_serverReceivingParametersOfAllPrimitiveAndWrapperTypesExceptLongCorrectly'/*(byte, short, int, float, double, boolean, char, Byte, Short, Integer, Float, Double, Boolean, Character, Number) => String */,
        len: 15,
        formHandler: false
      },
      {
        name: 'test_serverReceivingJsonNumberInBigDecimal'/*(java.math.BigDecimal) => boolean */,
        len: 1,
        formHandler: false
      },
      {
        name: 'test_serverReceivingNoArguments'/*() => String */,
        len: 0,
        formHandler: false
      },
      {
        name: 'test_serverReceivingSeveralParametersWithTheLastOneUndefined'/*(String, String, String) => String */,
        len: 3,
        formHandler: false
      },
      {
        name: 'test_serverReceivingSeveralParametersOneOfThemUndefined'/*(String, String, String) => String */,
        len: 3,
        formHandler: false
      },
      {
        name: 'test_serverReceivingMultiElementIntArrayInIntPrimitive'/*(int) => boolean */,
        len: 1,
        formHandler: false
      },
      {
        name: 'test_serverReceivingCallCausingInfiniteRecursionIfParametersRecursivelyChecked'/*(Object) => boolean */,
        len: 1,
        formHandler: false
      },
      {
        name: 'test_serverReceivingParametersWithArrayHavingObjectHavingArrayWithUndefinedValue'/*(String) => boolean */,
        len: 1,
        formHandler: false
      },
      {
        name: 'test_serverMethodWithNoAnnotation'/*(int, String) => String */,
        len: 2,
        formHandler: false
      },
      {
        name: 'test_serverReceivingCharFromNumberTooSmall'/*(Character) => char */,
        len: 1,
        formHandler: false
      },
      {
        name: 'test_privateMethodCall'/*() => boolean */,
        len: 0,
        formHandler: false
      },
      {
        name: 'test_serverReceivingParametersWithArrayHavingArrayWithUndefinedValue'/*(String) => boolean */,
        len: 1,
        formHandler: false
      },
      {
        name: 'test_serverReceivingSeveralParametersWithTheLastOneNull'/*(String, String, String) => String */,
        len: 3,
        formHandler: false
      },
      {
        name: 'test_serverReceivingDoubleArray'/*(double[]) => double */,
        len: 1,
        formHandler: false
      },
      {
        name: 'test_serverReceivingNullStringArray'/*(String[]) => boolean */,
        len: 1,
        formHandler: false
      },
      {
        name: 'test_serverReceivingJavascriptFunction'/*(String) => boolean */,
        len: 1,
        formHandler: false
      },
      {
        name: 'test_serverReceivingJsonObjectInTypedObject'/*(com.softwarementors.extjs.djn.test.helper.ComplexObject) => boolean */,
        len: 1,
        formHandler: false
      },
      {
        name: 'test_serverReceivingParametersWithObjectHavingObjectHavingArrayWithUndefinedValue'/*(String) => boolean */,
        len: 1,
        formHandler: false
      },
      {
        name: 'test_serverReceivingUndefinedForAPrimitive'/*(int) => boolean */,
        len: 1,
        formHandler: false
      },
      {
        name: 'test_serverReceivingJsonStringWithSeveralCharsInCharPrimitive'/*(char) => char */,
        len: 1,
        formHandler: false
      },
      {
        name: 'test_serverReceivingPrimitiveDoubleArray'/*(Double[]) => double */,
        len: 1,
        formHandler: false
      },
      {
        name: 'test_serverReceivingManyParameters'/*(int, String) => String */,
        len: 2,
        formHandler: false
      },
      {
        name: 'test_serverReceivingVeryComplexObject'/*(com.softwarementors.extjs.djn.test.helper.VeryComplexObject) => boolean */,
        len: 1,
        formHandler: false
      },
      {
        name: 'test_serverReceivingJsonArrayOfPrimitiveEmptyInPrimitiveArray'/*(int[]) => boolean */,
        len: 1,
        formHandler: false
      },
      {
        name: 'test_serverReceivingUniqueParameterUndefined'/*(String) => String */,
        len: 1,
        formHandler: false
      },
      {
        name: 'test_serverReceivingStringInIntPrimitive'/*(int) => boolean */,
        len: 1,
        formHandler: false
      },
      {
        name: 'test_serverReceivingJsonStringInBigInteger'/*(java.math.BigInteger) => boolean */,
        len: 1,
        formHandler: false
      },
      {
        name: 'test_serverReceivingJsonNullInString'/*(String) => boolean */,
        len: 1,
        formHandler: false
      },
      {
        name: 'test_serverReceivingJsonStringWithOneCharInCharPrimitive'/*(char) => char */,
        len: 1,
        formHandler: false
      }
    ],
    DirectStoreTest: [
      {
        name: 'test_loadWithArgumentsWithDirectJsonHandling'/*(com.google.gson.JsonArray) => com.softwarementors.extjs.djn.test.DirectStoreTest$DirectStoreResult */,
        len: 1,
        formHandler: false
      },
      {
        name: 'test_simulatePassingDynamicParams'/*(boolean, com.softwarementors.extjs.djn.test.DirectStoreTest$Parameter[]) => com.softwarementors.extjs.djn.test.DirectStoreTest$DirectStoreResult */,
        len: 2,
        formHandler: false
      },
      {
        name: 'test_loadWithArgumentsUsingClass'/*(com.softwarementors.extjs.djn.test.DirectStoreTest$LoadArgs) => com.softwarementors.extjs.djn.test.DirectStoreTest$DirectStoreResult */,
        len: 1,
        formHandler: false
      },
      {
        name: 'test_load2'/*() => com.softwarementors.extjs.djn.test.DirectStoreTest$DirectStoreResult */,
        len: 0,
        formHandler: false
      },
      {
        name: 'test_loadWithArguments'/*(int, boolean, String) => com.softwarementors.extjs.djn.test.DirectStoreTest$DirectStoreResult */,
        len: 3,
        formHandler: false
      },
      {
        name: 'test_load'/*(String) => com.softwarementors.extjs.djn.test.DirectStoreTest$Output[] */,
        len: 1,
        formHandler: false
      }
    ],
    SessionStatefulActionTest: [
      {
        name: 'test_getSessionCallCount'/*() => int */,
        len: 0,
        formHandler: false
      },
      {
        name: 'resetSessionData'/*() => void */,
        len: 0,
        formHandler: false
      },
      {
        name: 'test_getSessionData'/*() => int */,
        len: 0,
        formHandler: false
      }
    ],
    DeserializationOfSingleItemToSingleItemArrayTest: [
      {
        name: 'test_serverReceivingJsonNumberInIntArrayCreatesSingleItemArray'/*(int[]) => int */,
        len: 1,
        formHandler: false
      },
      {
        name: 'test_serverReceivingJsonObjectInArrayCreatesSingleItemArray'/*(com.softwarementors.extjs.djn.test.DeserializationOfSingleItemToSingleItemArrayTest$MyClass[]) => int */,
        len: 1,
        formHandler: false
      },
      {
        name: 'test_serverReceivingJsonStringInArrayCreatesSingleItemArray'/*(String[]) => int */,
        len: 1,
        formHandler: false
      },
      {
        name: 'test_serverReceivingJsonStringInCharArrayCreatesSingleItemArray'/*(char[]) => int */,
        len: 1,
        formHandler: false
      }
    ],
    CdiApplicationScopedActionTest: [
      {
        name: 'resetApplicationData'/*() => void */,
        len: 0,
        formHandler: false
      },
      {
        name: 'test_getCdiApplicationCallCount'/*() => int */,
        len: 0,
        formHandler: false
      },
      {
        name: 'test_getCdiApplicationData'/*() => int */,
        len: 0,
        formHandler: false
      }
    ],
    DeserializationFieldExclusionTest: [
      {
        name: 'test_allFieldsExclusion'/*(com.softwarementors.extjs.djn.test.DeserializationFieldExclusionTest$MyThing) => com.softwarementors.extjs.djn.test.DeserializationFieldExclusionTest$MyThing */,
        len: 1,
        formHandler: false
      },
      {
        name: 'test_fieldInDerivedClassFieldExclusion'/*() => com.softwarementors.extjs.djn.test.ServerMethodReturnTest$Base */,
        len: 0,
        formHandler: false
      },
      {
        name: 'test_arrayFieldExclusion'/*(com.softwarementors.extjs.djn.test.DeserializationFieldExclusionTest$WithArray) => com.softwarementors.extjs.djn.test.DeserializationFieldExclusionTest$WithArray */,
        len: 1,
        formHandler: false
      },
      {
        name: 'test_primitiveFieldExclusion'/*(com.softwarementors.extjs.djn.test.DeserializationFieldExclusionTest$MyThing) => com.softwarementors.extjs.djn.test.DeserializationFieldExclusionTest$MyThing */,
        len: 1,
        formHandler: false
      },
      {
        name: 'test_objectFieldExclusion'/*(com.softwarementors.extjs.djn.test.DeserializationFieldExclusionTest$MyThing) => com.softwarementors.extjs.djn.test.DeserializationFieldExclusionTest$MyThing */,
        len: 1,
        formHandler: false
      },
      {
        name: 'test_nullFieldExclusion'/*(com.softwarementors.extjs.djn.test.DeserializationFieldExclusionTest$MyThing) => com.softwarementors.extjs.djn.test.DeserializationFieldExclusionTest$MyThing */,
        len: 1,
        formHandler: false
      },
      {
        name: 'test_manyValuedFieldsExclusion'/*(com.softwarementors.extjs.djn.test.DeserializationFieldExclusionTest$ClassWithManyValued) => com.softwarementors.extjs.djn.test.DeserializationFieldExclusionTest$ClassWithManyValued */,
        len: 1,
        formHandler: false
      },
      {
        name: 'test_veryDeepFieldExclusion'/*(com.softwarementors.extjs.djn.test.DeserializationFieldExclusionTest$MyThing) => com.softwarementors.extjs.djn.test.DeserializationFieldExclusionTest$MyThing */,
        len: 1,
        formHandler: false
      },
      {
        name: 'test_nestedFieldExclusion'/*(com.softwarementors.extjs.djn.test.DeserializationFieldExclusionTest$MyThing) => com.softwarementors.extjs.djn.test.DeserializationFieldExclusionTest$MyThing */,
        len: 1,
        formHandler: false
      },
      {
        name: 'test_multipleFieldExclusion'/*(com.softwarementors.extjs.djn.test.DeserializationFieldExclusionTest$MyThing) => com.softwarementors.extjs.djn.test.DeserializationFieldExclusionTest$MyThing */,
        len: 1,
        formHandler: false
      }
    ],
    singletonBean: [
      {
        name: 'test_getSpringApplicationCallCount'/*() => int */,
        len: 0,
        formHandler: false
      },
      {
        name: 'resetApplicationData'/*() => void */,
        len: 0,
        formHandler: false
      },
      {
        name: 'test_getSpringApplicationData'/*() => int */,
        len: 0,
        formHandler: false
      }
    ],
    BatchRequestMultithreadedHandlingTest: [
      {
        name: 'wait'/*(int) => void */,
        len: 1,
        formHandler: false
      }
    ],
    DeserializationToUntypedObjectsTest: [
      {
        name: 'test_JsonObjectInStringMap'/*(java.util.Map) => java.util.Map */,
        len: 1,
        formHandler: false
      },
      {
        name: 'test_JsonNullInObjectArray'/*(Object[]) => Object[] */,
        len: 1,
        formHandler: false
      },
      {
        name: 'test_JsonPrimitiveNumberInObject'/*(Object) => Object */,
        len: 1,
        formHandler: false
      },
      {
        name: 'test_JsonArrayWithDifferentJsonTypesInObject'/*(Object) => Object */,
        len: 1,
        formHandler: false
      },
      {
        name: 'test_JsonArrayInObjectArrayField'/*(com.softwarementors.extjs.djn.test.DeserializationToUntypedObjectsTest$TypeWithObjectArrayField) => com.softwarementors.extjs.djn.test.DeserializationToUntypedObjectsTest$TypeWithObjectArrayField */,
        len: 1,
        formHandler: false
      },
      {
        name: 'test_JsonArrayInListUntyped'/*(java.util.List) => java.util.List */,
        len: 1,
        formHandler: false
      },
      {
        name: 'test_JsonBooleanInObject'/*(Object) => Object */,
        len: 1,
        formHandler: false
      },
      {
        name: 'test_JsonObjectInObjectField'/*(com.softwarementors.extjs.djn.test.DeserializationToUntypedObjectsTest$TypeWithObjectField) => com.softwarementors.extjs.djn.test.DeserializationToUntypedObjectsTest$TypeWithObjectField */,
        len: 1,
        formHandler: false
      },
      {
        name: 'test_JsonObjectInListUntyped'/*(java.util.List) => java.util.List */,
        len: 1,
        formHandler: false
      },
      {
        name: 'test_JsonPrimitiveStringInObject'/*(Object) => Object */,
        len: 1,
        formHandler: false
      },
      {
        name: 'test_JsonObjectPrimitiveNumberInObjectArray'/*(Object[]) => Object[] */,
        len: 1,
        formHandler: false
      },
      {
        name: 'test_JsonObjectInObjectArray'/*(Object[]) => Object[] */,
        len: 1,
        formHandler: false
      },
      {
        name: 'test_JsonArrayInStringMapField'/*(com.softwarementors.extjs.djn.test.DeserializationToUntypedObjectsTest$TypeWithStringMapField) => com.softwarementors.extjs.djn.test.DeserializationToUntypedObjectsTest$TypeWithStringMapField */,
        len: 1,
        formHandler: false
      },
      {
        name: 'test_JsonNullInStringMap'/*(java.util.Map) => java.util.Map */,
        len: 1,
        formHandler: false
      },
      {
        name: 'test_JsonArrayInObjectListField'/*(com.softwarementors.extjs.djn.test.DeserializationToUntypedObjectsTest$TypeWithObjectListField) => com.softwarementors.extjs.djn.test.DeserializationToUntypedObjectsTest$TypeWithObjectListField */,
        len: 1,
        formHandler: false
      },
      {
        name: 'test_JsonObjectInObject'/*(Object) => Object */,
        len: 1,
        formHandler: false
      },
      {
        name: 'test_JsonPrimitiveNumberInStringMap_fails'/*(java.util.Map) => java.util.Map */,
        len: 1,
        formHandler: false
      },
      {
        name: 'test_JsonArrayInObject'/*(Object) => Object */,
        len: 1,
        formHandler: false
      },
      {
        name: 'test_JsonNullInObject'/*(Object) => Object */,
        len: 1,
        formHandler: false
      },
      {
        name: 'test_JsonArrayInObjectArray'/*(Object[]) => Object[] */,
        len: 1,
        formHandler: false
      }
    ],
    ServerMethodReturnTest: [
      {
        name: 'test_serverReturningString'/*() => String */,
        len: 0,
        formHandler: false
      },
      {
        name: 'test_serverReturningLong'/*() => long */,
        len: 0,
        formHandler: false
      },
      {
        name: 'test_serverReturningCharacterObject'/*() => Character */,
        len: 0,
        formHandler: false
      },
      {
        name: 'test_serverReturningFloatObject'/*() => Float */,
        len: 0,
        formHandler: false
      },
      {
        name: 'test_serverReturningNothing'/*() => void */,
        len: 0,
        formHandler: false
      },
      {
        name: 'test_serverReturningDoubleObject'/*() => Double */,
        len: 0,
        formHandler: false
      },
      {
        name: 'test_chineseStringsWorkCorrectly'/*(String) => String */,
        len: 1,
        formHandler: false
      },
      {
        name: 'test_serverReturningDouble'/*() => double */,
        len: 0,
        formHandler: false
      },
      {
        name: 'test_serverReturningPolymorphicValues'/*() => com.softwarementors.extjs.djn.test.ServerMethodReturnTest$Base[] */,
        len: 0,
        formHandler: false
      },
      {
        name: 'test_serverReturningNull'/*() => String */,
        len: 0,
        formHandler: false
      },
      {
        name: 'test_serverReturningByte'/*() => byte */,
        len: 0,
        formHandler: false
      },
      {
        name: 'test_serverReturningInt'/*() => int */,
        len: 0,
        formHandler: false
      },
      {
        name: 'test_serverReturningChar'/*() => byte */,
        len: 0,
        formHandler: false
      },
      {
        name: 'test_serverReturningMap'/*() => java.util.Map */,
        len: 0,
        formHandler: false
      },
      {
        name: 'test_serverReturningIntegerObject'/*() => Integer */,
        len: 0,
        formHandler: false
      },
      {
        name: 'test_serverReturningLongObject'/*() => Long */,
        len: 0,
        formHandler: false
      },
      {
        name: 'test_serverReturningEmptyString'/*() => String */,
        len: 0,
        formHandler: false
      },
      {
        name: 'test_serverReturningShort'/*() => short */,
        len: 0,
        formHandler: false
      },
      {
        name: 'test_serverReturningShortObject'/*() => Short */,
        len: 0,
        formHandler: false
      },
      {
        name: 'test_serverReturningPrimitiveDoubleArray'/*(double, int) => double[] */,
        len: 2,
        formHandler: false
      },
      {
        name: 'test_serverReturningVeryComplexObject'/*() => com.softwarementors.extjs.djn.test.helper.VeryComplexObject */,
        len: 0,
        formHandler: false
      },
      {
        name: 'test_serverReturningByteObject'/*() => Byte */,
        len: 0,
        formHandler: false
      },
      {
        name: 'test_serverReturningFloat'/*() => float */,
        len: 0,
        formHandler: false
      }
    ],
    CustomGsonBuilderHandlingTest: [
      {
        name: 'test_specialGregorianCalendarSerialization'/*() => java.util.GregorianCalendar */,
        len: 0,
        formHandler: false
      },
      {
        name: 'test_specialGregorianCalendarDeserialization'/*(java.util.GregorianCalendar) => boolean */,
        len: 1,
        formHandler: false
      }
    ],
    DateHandlingTest: [
      {
        name: 'test_dateHandling'/*(java.util.Date) => java.util.Date */,
        len: 1,
        formHandler: false
      },
      {
        name: 'test_dateHandlngForWrongJsonType'/*(java.util.Date) => java.util.Date */,
        len: 1,
        formHandler: false
      },
      {
        name: 'test_nullDateHandling'/*(java.util.Date) => java.util.Date */,
        len: 1,
        formHandler: false
      }
    ],
    ApplicationStatefulActionTest: [
      {
        name: 'resetApplicationData'/*() => void */,
        len: 0,
        formHandler: false
      },
      {
        name: 'test_getApplicationData'/*() => int */,
        len: 0,
        formHandler: false
      },
      {
        name: 'test_getApplicationCallCount'/*() => int */,
        len: 0,
        formHandler: false
      }
    ],
    FormTest: [
      {
        name: 'test_formPostForNonAnnotatedMethod'/*() => com.softwarementors.extjs.djn.test.FormTest$OkResult -- FORM HANDLER */,
        len: 1,
        formHandler: true
      },
      {
        name: 'test_handleFormCausingServerException'/*() => com.softwarementors.extjs.djn.test.FormTest$OkResult -- FORM HANDLER */,
        len: 1,
        formHandler: true
      },
      {
        name: 'test_handleFormWithBaseParams'/*() => com.softwarementors.extjs.djn.test.FormTest$OkResult -- FORM HANDLER */,
        len: 1,
        formHandler: true
      },
      {
        name: 'test_handleForm'/*() => com.softwarementors.extjs.djn.test.FormTest$OkResult -- FORM HANDLER */,
        len: 1,
        formHandler: true
      }
    ],
    ManualFormUploadSupportTest: [
      {
        name: 'test_sendFilesManually'/*() => com.softwarementors.extjs.djn.test.ManualFormUploadSupportTest$Result -- FORM HANDLER */,
        len: 1,
        formHandler: true
      }
    ],
    DeserializationToGenericTypesTest: [
      {
        name: 'test_MapWithGenericValue'/*(java.util.Map) => java.util.Map */,
        len: 1,
        formHandler: false
      },
      {
        name: 'test_genericListReceivingSingleJsonObjectGeneratesSingleItemList'/*(java.util.List) => java.util.List */,
        len: 1,
        formHandler: false
      },
      {
        name: 'test_genericListReceivingSinglePrimitiveStringGeneratesSingleItemList'/*(java.util.List) => java.util.List */,
        len: 1,
        formHandler: false
      },
      {
        name: 'test_GenericObject'/*(com.softwarementors.extjs.djn.test.helper.GenericTestObject, com.softwarementors.extjs.djn.test.helper.GenericTestObject) => com.softwarementors.extjs.djn.test.helper.GenericTestObject */,
        len: 2,
        formHandler: false
      },
      {
        name: 'test_GenericCollections'/*(java.util.List, java.util.List) => java.util.List */,
        len: 2,
        formHandler: false
      },
      {
        name: 'test_GenericComplexObject'/*(java.util.List) => java.util.List */,
        len: 1,
        formHandler: false
      },
      {
        name: 'test_JsonObjectInObjectContainingGenerics'/*(com.softwarementors.extjs.djn.test.DeserializationToGenericTypesTest$MyClassWithGenerics) => com.softwarementors.extjs.djn.test.DeserializationToGenericTypesTest$MyClassWithGenerics */,
        len: 1,
        formHandler: false
      }
    ],
    ActionClassImplementingAnInterfaceTest: [
      {
        name: 'callMethodInClassImplementingAnInterface'/*(String) => String */,
        len: 1,
        formHandler: false
      }
    ],
    MethodsInBaseClassCorrectlyScannedTest: [
      {
        name: 'test_serverReturningString'/*() => String */,
        len: 0,
        formHandler: false
      },
      {
        name: 'test_serverReturningLong'/*() => long */,
        len: 0,
        formHandler: false
      },
      {
        name: 'test_serverReturningCharacterObject'/*() => Character */,
        len: 0,
        formHandler: false
      },
      {
        name: 'test_serverReturningFloatObject'/*() => Float */,
        len: 0,
        formHandler: false
      },
      {
        name: 'test_serverReturningNothing'/*() => void */,
        len: 0,
        formHandler: false
      },
      {
        name: 'test_serverReturningDoubleObject'/*() => Double */,
        len: 0,
        formHandler: false
      },
      {
        name: 'test_chineseStringsWorkCorrectly'/*(String) => String */,
        len: 1,
        formHandler: false
      },
      {
        name: 'test_serverReturningDouble'/*() => double */,
        len: 0,
        formHandler: false
      },
      {
        name: 'test_serverReturningPolymorphicValues'/*() => com.softwarementors.extjs.djn.test.ServerMethodReturnTest$Base[] */,
        len: 0,
        formHandler: false
      },
      {
        name: 'test_serverReturningNull'/*() => String */,
        len: 0,
        formHandler: false
      },
      {
        name: 'test_serverReturningByte'/*() => byte */,
        len: 0,
        formHandler: false
      },
      {
        name: 'test_serverReturningInt'/*() => int */,
        len: 0,
        formHandler: false
      },
      {
        name: 'test_serverReturningChar'/*() => byte */,
        len: 0,
        formHandler: false
      },
      {
        name: 'test_serverReturningMap'/*() => java.util.Map */,
        len: 0,
        formHandler: false
      },
      {
        name: 'test_serverReturningIntegerObject'/*() => Integer */,
        len: 0,
        formHandler: false
      },
      {
        name: 'test_serverReturningLongObject'/*() => Long */,
        len: 0,
        formHandler: false
      },
      {
        name: 'test_serverReturningEmptyString'/*() => String */,
        len: 0,
        formHandler: false
      },
      {
        name: 'test_serverReturningShort'/*() => short */,
        len: 0,
        formHandler: false
      },
      {
        name: 'test_serverReturningShortObject'/*() => Short */,
        len: 0,
        formHandler: false
      },
      {
        name: 'test_serverReturningPrimitiveDoubleArray'/*(double, int) => double[] */,
        len: 2,
        formHandler: false
      },
      {
        name: 'test_serverReturningVeryComplexObject'/*() => com.softwarementors.extjs.djn.test.helper.VeryComplexObject */,
        len: 0,
        formHandler: false
      },
      {
        name: 'test_serverReturningByteObject'/*() => Byte */,
        len: 0,
        formHandler: false
      },
      {
        name: 'test_serverReturningFloat'/*() => float */,
        len: 0,
        formHandler: false
      }
    ],
    action2: [
      {
        name: 'getValue'/*() => int */,
        len: 0,
        formHandler: false
      }
    ],
    action1: [
      {
        name: 'getValue'/*() => int */,
        len: 0,
        formHandler: false
      }
    ],
    WebContextManagerTest: [
      {
        name: 'test_webContext'/*() => com.softwarementors.extjs.djn.test.servlet.ssm.WebContextManagerTest$WebContextInfo */,
        len: 0,
        formHandler: false
      }
    ],
    PollTest: [
    ],
    sessionBean: [
      {
        name: 'resetSessionData'/*() => void */,
        len: 0,
        formHandler: false
      },
      {
        name: 'test_getSpringSessionCallCount'/*() => int */,
        len: 0,
        formHandler: false
      },
      {
        name: 'test_getSpringSessionData'/*() => int */,
        len: 0,
        formHandler: false
      }
    ],
    CdiSessionScopedActionTest: [
      {
        name: 'test_getCdiSessionCallCount'/*() => int */,
        len: 0,
        formHandler: false
      },
      {
        name: 'resetSessionData'/*() => void */,
        len: 0,
        formHandler: false
      },
      {
        name: 'test_getCdiSessionData'/*() => int */,
        len: 0,
        formHandler: false
      }
    ]
  }
}

