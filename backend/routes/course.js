const Joi = require('joi');

const courseControllers = require('../controllers/course');


const courseJoiSchema = Joi.object({
  name: Joi.string().required(),
  category: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().required(),
  thumbnail: Joi.string(),
  instructor: Joi.string().required(),
  bookmark: Joi.bool().default(false),
});

module.exports = [
  {
    method: 'POST',
    path: '/course',
    handler: courseControllers.createCourse,
    options: {
      description: 'Create a course',
      tags: ['api', 'course'],
      auth: { strategy: 'default', scope: ['ADMIN', 'PROFESSOR'] },
      validate: {
        payload: courseJoiSchema,
      },
    },
  },
  {
    method: 'GET',
    path: '/course/{courseId}',
    handler: courseControllers.courseDetails,
    options: {
      description: 'Course details',
      tags: ['api', 'course'],
      auth: { strategy: 'default', scope: ['ADMIN', 'PROFESSOR'] },
      validate: {
        params: Joi.object({
          courseId: Joi.string().required(),
        }),
      },
    },
  },
  {
    method: 'GET',
    path: '/course',
    handler: courseControllers.getAllCourses,
    options: {
      description: 'Get all courses',
      tags: ['api', 'course'],
      auth: { strategy: 'default', scope: ['ADMIN'] },
    },
  },
  {
    method: 'GET',
    path: '/course/instructor/{name}',
    handler: courseControllers.findCourseByInstructor,
    options: {
      description: 'Get course details by instructor',
      tags: ['api', 'course'],
      auth: { strategy: 'default', scope: ['ADMIN', 'STUDENT'] },
      validate: {
        params: Joi.object({
          name: Joi.string().required(),
        }),
      },
    },
  },
  {
    method: 'PUT',
    path: '/course/{courseId}',
    handler: courseControllers.updateCourseDetails,
    options: {
      description: 'Update course details',
      tags: ['api', 'course'],
      auth: { strategy: 'default', scope: ['ADMIN', 'PROFESSOR'] },
      validate: {
        params: Joi.object({
          courseId: Joi.string().required(),
        }),
        payload: Joi.object({
          name: Joi.string(),
          category: Joi.string(),
          description: Joi.string(),
          price: Joi.number(),
          thumbnail: Joi.string(),
          instructor: Joi.string(),
          bookmark: Joi.bool().default(false),
        })
      },
    },
  },
  {
    method: 'DELETE',
    path: '/course/{courseId}',
    handler: courseControllers.deleteCourse,
    options: {
      description: 'Delete course',
      tags: ['api', 'course'],
      auth: { strategy: 'default', scope: ['ADMIN', 'PROFESSOR'] },
      validate: {
        params: Joi.object({
          courseId: Joi.string().required(),
        }),
      },
    },
  },
];