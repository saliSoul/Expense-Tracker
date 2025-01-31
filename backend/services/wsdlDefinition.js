export const wsdlDefinition = `
<definitions name="ExpenseService"
  targetNamespace="http://www.example.org/ExpenseService/"
  xmlns:tns="http://www.example.org/ExpenseService/"
  xmlns:soap="http://schemas.xmlsoap.org/wsdl/soap/"
  xmlns:xsd="http://www.w3.org/2001/XMLSchema"
  xmlns="http://schemas.xmlsoap.org/wsdl/">

  <message name="getExpensesByCategoryRequest">
    <part name="userId" type="xsd:string"/>
    <part name="categoryName" type="xsd:string"/>
  </message>
  <message name="getExpensesByCategoryResponse">
    <part name="expenses" type="xsd:string"/>
    <part name="error" type="xsd:string"/>
  </message>

  <portType name="ExpensePortType">
    <operation name="getExpensesByCategory">
      <input message="tns:getExpensesByCategoryRequest"/>
      <output message="tns:getExpensesByCategoryResponse"/>
    </operation>
  </portType>

  <binding name="ExpensePortBinding" type="tns:ExpensePortType">
    <soap:binding style="rpc" transport="http://schemas.xmlsoap.org/soap/http"/>
    <operation name="getExpensesByCategory">
      <soap:operation soapAction="http://www.example.org/getExpensesByCategory"/>
      <input>
        <soap:body use="literal"/>
      </input>
      <output>
        <soap:body use="literal"/>
      </output>
    </operation>
  </binding>

  <service name="ExpenseService">
    <port name="ExpensePort" binding="tns:ExpensePortBinding">
      <soap:address location="http://localhost:5007/wsdl"/>
    </port>
  </service>
</definitions>
`;
