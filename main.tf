provider "aws" {
  region = "us-east-1"
}

resource "aws_dynamodb_table" "patients" {
  name         = "Patients"
  hash_key     = "id"
  billing_mode = "PAY_PER_REQUEST"

  attribute {
    name = "id"
    type = "S"
  }
}

resource "aws_iam_role" "lambda_exec_role" {
  name               = "lambda_exec_role"
  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "lambda.amazonaws.com"
      },
      "Effect": "Allow"
    }
  ]
}
EOF
}

resource "aws_iam_role_policy" "lambda_exec_policy" {
  name   = "dynamodb_access"
  role   = aws_iam_role.lambda_exec_role.id
  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": [
        "dynamodb:*"
      ],
      "Resource": "*",
      "Effect": "Allow"
    }
  ]
}
EOF
}


resource "aws_lambda_function" "patient_api" {
  filename      = "dist/lambda.zip"
  function_name = "PatientAPI"
  role          = aws_iam_role.lambda_exec_role.arn
  handler       = "app.handler"
  runtime       = "nodejs18.x"

  environment {
    variables = {
      TABLE_NAME = aws_dynamodb_table.patients.name
    }
  }
}

resource "aws_api_gateway_rest_api" "patient_api" {
  name = "PatientAPI"
}

resource "aws_api_gateway_resource" "patients_resource" {
  rest_api_id = aws_api_gateway_rest_api.patient_api.id
  parent_id   = aws_api_gateway_rest_api.patient_api.root_resource_id
  path_part   = "patients"
}

resource "aws_api_gateway_method" "patients_method" {
  rest_api_id   = aws_api_gateway_rest_api.patient_api.id
  resource_id   = aws_api_gateway_resource.patients_resource.id
  http_method   = "ANY"
  authorization = "NONE"
}

resource "aws_api_gateway_integration" "patients_integration" {
  rest_api_id             = aws_api_gateway_rest_api.patient_api.id
  resource_id             = aws_api_gateway_resource.patients_resource.id
  http_method             = aws_api_gateway_method.patients_method.http_method
  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = aws_lambda_function.patient_api.invoke_arn
}

resource "aws_api_gateway_deployment" "patient_api_deployment" {
  rest_api_id = aws_api_gateway_rest_api.patient_api.id
  depends_on  = [aws_api_gateway_integration.patients_integration]
}

resource "aws_lambda_permission" "api_gateway" {
  statement_id  = "AllowAPIGatewayInvoke"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.patient_api.function_name
  principal     = "apigateway.amazonaws.com"
}

output "api_gateway_url" {
  value = aws_api_gateway_rest_api.patient_api.execution_arn
}
