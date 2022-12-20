package com.team.todaycheck.main.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QParticipantsMission is a Querydsl query type for ParticipantsMission
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QParticipantsMission extends EntityPathBase<ParticipantsMission> {

    private static final long serialVersionUID = -1679785293L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QParticipantsMission participantsMission = new QParticipantsMission("participantsMission");

    public final DateTimePath<java.util.Date> checkDate = createDateTime("checkDate", java.util.Date.class);

    public final NumberPath<Long> keys = createNumber("keys", Long.class);

    public final QMission mission;

    public final QUserEntity participants;

    public QParticipantsMission(String variable) {
        this(ParticipantsMission.class, forVariable(variable), INITS);
    }

    public QParticipantsMission(Path<? extends ParticipantsMission> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QParticipantsMission(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QParticipantsMission(PathMetadata metadata, PathInits inits) {
        this(ParticipantsMission.class, metadata, inits);
    }

    public QParticipantsMission(Class<? extends ParticipantsMission> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.mission = inits.isInitialized("mission") ? new QMission(forProperty("mission"), inits.get("mission")) : null;
        this.participants = inits.isInitialized("participants") ? new QUserEntity(forProperty("participants")) : null;
    }

}

