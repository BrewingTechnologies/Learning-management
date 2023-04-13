const Joi = require('joi')

const courseControllers = require('../controllers/course')

const courseJoiSchema = Joi.object({
  name: Joi.string().required(),
  category: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().required(),
  user: Joi.string().required(),
  duration: Joi.string().required()
})

module.exports = [
  {
    method: 'POST',
    path: '/courses',
    handler: courseControllers.createCourse,
    options: {
      description: 'Create a course',
      tags: ['api', 'course'],
      auth: { strategy: 'default', scope: ['ADMIN', 'PROFESSOR'] },
      validate: {
        payload: courseJoiSchema
      }
    }
  },
  {
    method: 'GET',
    path: '/courses/{courseId}',
    handler: courseControllers.courseDetails,
    options: {
      description: 'Course details',
      tags: ['api', 'course'],
      auth: { strategy: 'default', scope: ['ADMIN', 'PROFESSOR'] },
      validate: {
        params: Joi.object({
          courseId: Joi.string().required()
        })
      }
    }
  },
  {
    method: 'GET',
    path: '/courses',
    handler: courseControllers.getAllCourses,
    options: {
      description: 'Get all courses',
      tags: ['api', 'course'],
      auth: { strategy: 'default', scope: ['ADMIN'] }
    }
  },
  {
    method: 'GET',
    path: '/courses/instructor/{name}',
    handler: courseControllers.findCourseByInstructor,
    options: {
      description: 'Get course details by instructor',
      tags: ['api', 'course'],
      auth: { strategy: 'default', scope: ['ADMIN', 'STUDENT'] },
      validate: {
        params: Joi.object({
          name: Joi.string().required()
        })
      }
    }
  },
  {
    method: 'PUT',
    path: '/courses/{courseId}',
    handler: courseControllers.updateCourseDetails,
    options: {
      description: 'Update course details',
      tags: ['api', 'course'],
      auth: { strategy: 'default', scope: ['ADMIN', 'PROFESSOR'] },
      validate: {
        params: Joi.object({
          courseId: Joi.string().required()
        }),
        payload: Joi.object({
          name: Joi.string(),
          category: Joi.string(),
          description: Joi.string(),
          price: Joi.number(),
          thumbnail: Joi.string(),
          user: Joi.string(),
          bookmark: Joi.bool().default(false),
          duration: Joi.string(),
          isEnrolled: Joi.boolean().valid(true, false)
        })
      }
    }
  },
  {
    method: 'DELETE',
    path: '/courses/{courseId}',
    handler: courseControllers.deleteCourse,
    options: {
      description: 'Delete course',
      tags: ['api', 'course'],
      auth: { strategy: 'default', scope: ['ADMIN', 'PROFESSOR'] },
      validate: {
        params: Joi.object({
          courseId: Joi.string().required()
        })
      }
    }
  },
  {
    method: 'GET',
    path: '/courses/student/{userId}/wish-list',
    handler: courseControllers.courseWishList,
    options: {
      description: 'Student bookmarked courses',
      tags: ['api', 'course'],
      auth: { strategy: 'default', scope: ['STUDENT'] },
      validate: {
        params: Joi.object({
          userId: Joi.string().required()
        })
      }
    }
  },
  {
    method: 'GET',
    path: '/courses/stundet/{userId}/enrolled',
    handler: courseControllers.studentEnrolledCourses,
    options: {
      description: 'Student enrolled courses',
      tags: ['api', 'course'],
      auth: { strategy: 'default', scope: ['STUDENT'] },
      validate: {
        params: Joi.object({
          userId: Joi.string().required()
        })
      }
    }
  },
  {
    method: 'PUT',
    path: '/courses/category',
    handler: courseControllers.coursesByCategory,
    options: {
      description: 'Get all courses by category',
      tags: ['api', 'course'],
      auth: { strategy: 'default', scope: ['ADMIN', 'STUDENT'] },
      validate: {
        payload: Joi.object({
          category: Joi.string().required()
        })
      }
    }
  },
  {
    method: 'POST',
    path: '/courses/category',
    handler: courseControllers.coursesByCategory,
    options: {
      description: 'Get all courses by category',
      tags: ['api', 'course'],
      auth: { strategy: 'default', scope: ['ADMIN', 'STUDENT'] },
      validate: {
        payload: Joi.object({
          category: Joi.string().required()
        })
      }
    }
  },
  {
    method: 'GET',
    path: '/courses/{instructorId}/instructor',
    handler: courseControllers.getCoursesOfInstructor,
    options: {
      description: 'Get Instructor courses',
      tags: ['api', 'course'],
      auth: { strategy: 'default', scope: ['ADMIN', 'PROFESSOR'] },
      validate: {
        params: Joi.object({
          instructorId: Joi.string().required()
        })
      }
    }
  },
  {
    method: 'PUT',
    path: '/courses/enrollment/{userId}',
    handler: courseControllers.updateCourseEnrollmentOfStundet,
    options: {
      description: 'Update Stundet course enrollment',
      tags: ['api', 'course'],
      auth: { strategy: 'default', scope: ['STUDENT'] },
      validate: {
        params: Joi.object({
          userId: Joi.string().required()
        }),
        query: Joi.object({
          isEnrolled: Joi.boolean().valid(true, false)
        })
      }
    }
  },
  {
    method: 'PUT',
    path: '/courses/bookmark/{userId}',
    handler: courseControllers.updateCourseEnrollmentOfStundet,
    options: {
      description: 'Update Stundet Fav course',
      tags: ['api', 'course'],
      auth: { strategy: 'default', scope: ['STUDENT'] },
      validate: {
        params: Joi.object({
          userId: Joi.string().required()
        }),
        query: Joi.object({
          isFav: Joi.boolean().valid(true, false)
        })
      }
    }
  }
]
