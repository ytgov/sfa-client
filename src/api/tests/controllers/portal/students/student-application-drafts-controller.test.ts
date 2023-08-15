import { NextFunction, Request, Response } from "express"

import StudentApplicationDraftsService from "@/services/portal/students/student-application-drafts-service";
import ApplicationDraftsSerializer from "@/serializers/application-drafts-serializer";

import StudentApplicationDraftsController from "@/controllers/portal/students/student-application-drafts-controller"

// helpers
const mockRequest = (params: any) => ({
  params,
})

const mockResponse = () => {
  const res = {} as Response
  res.json = jest.fn().mockReturnValue(res)
  res.status = jest.fn().mockReturnValue(res)
  return res
}
const mockNext = () => jest.fn()

describe("StudentApplicationDraftsController", () => {
  test("ulistStudentApplicationDrafts", async () => {
    const req = mockRequest({ studentId: 2 }) as Request
    const res = mockResponse() as Response
    const next = mockNext() as NextFunction
    const controller = new StudentApplicationDraftsController(req, res, next)

    const mockDrafts = [{ id: 1 }, { id: 2 }];
    StudentApplicationDraftsService.prototype.getApplicationDrafts = jest.fn().mockResolvedValue(mockDrafts);
    ApplicationDraftsSerializer.prototype.asListView = jest.fn().mockReturnValue('serializedData');

    await controller.listStudentApplicationDrafts()

    expect(res.json).toHaveBeenCalledWith({
      data: 'serializedData'
    })
  })
})
